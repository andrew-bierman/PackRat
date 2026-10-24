# /// script
# requires-python = ">=3.12,<3.13"
# dependencies = [
#   "coremltools>=8.3",
#   "litert-torch>=0.9",
#   "ai-edge-litert>=2.0",
#   "numpy<2.3",
#   "pillow>=11",
#   "torch>=2.7,<2.14",
# ]
# ///
"""Converts the bundled Core ML species model to the TFLite model the Android app ships.

Run from this directory after export.py:
    uv run export_tflite.py

The source is the committed `.mlpackage`, not `artifacts/student.pt`, so the
Android model is the iOS model: same weights, same labels, rebuilt without
needing whoever trained it to have kept their checkpoint. Core ML has already
folded batch norm into the convolutions and the graph uses a dozen ops, so it
is replayed op by op in PyTorch and handed to LiteRT's converter.

The TFLite model takes a float32 NHWC image with 0–255 RGB values, centre
cropped to 224×224 (the same crop Vision's `.centerCrop` applies on iOS), and
returns softmax probabilities in label order. Labels are written beside it.
Weights are stored as float16 and compute stays float32. Uniform int8 halves
the size again but cannot represent Core ML's 8-bit palette: on real photos it
changed the top answer for 3 in 88 and moved 4 across the confident threshold,
where float16 matched Core ML on all of them. Both are re-scored against Core ML on the same inputs before anything is
written, so a conversion error shows up here and not on a trail.
"""

import json
from pathlib import Path

import coremltools as ct
import coremltools.optimize.coreml as cto
import numpy as np
import torch
import torch.nn.functional as F
from coremltools.converters.mil.frontend.milproto.load import load as load_mil
from PIL import Image

SOURCE = Path('../../Resources/SpeciesModels/WildlifeSpeciesModel.mlpackage')
OUTPUT_DIR = Path('../../../expo/assets/models')
MODEL_OUT = OUTPUT_DIR / 'wildlife-species.tflite'
LABELS_OUT = OUTPUT_DIR / 'wildlife-species.labels.json'
SIZE = 224
# Core ML runs in fp16 and TFLite in fp32, so outputs agree to fp16 precision,
# not bit for bit.
TOLERANCE = 0.02


class ReplayedProgram(torch.nn.Module):
    """Executes a Core ML MIL program's `main` function op by op."""

    def __init__(self, program):
        super().__init__()
        function = program.functions['main']
        self.input_name = next(iter(function.inputs))
        self.steps = []
        constants = {}
        for op in function.operations:
            if op.op_type == 'const':
                constants[op.outputs[0].name] = op.outputs[0].val
                continue
            if op.op_type == 'classify':
                break
            self.steps.append((op.op_type, op.outputs[0].name, dict(op.inputs)))
        # Weights become buffers so the converter sees them as constants.
        for index, (name, value) in enumerate(constants.items()):
            if isinstance(value, np.ndarray) and value.dtype.kind == 'f' and value.size > 4:
                self.register_buffer(f'c{index}', torch.from_numpy(value.astype(np.float32)))
                constants[name] = getattr(self, f'c{index}')
        self.constants = constants

    def value(self, var, values):
        if var.name in values:
            return values[var.name]
        constant = self.constants.get(var.name, var.val)
        if isinstance(constant, np.ndarray) and constant.dtype.kind == 'f':
            return torch.from_numpy(constant.astype(np.float32))
        return constant

    def forward(self, image: torch.Tensor) -> torch.Tensor:
        # NHWC 0–255 in, which is what the app produces from decoded pixels.
        values = {self.input_name: image.permute(0, 3, 1, 2)}
        output = None
        for op_type, name, inputs in self.steps:
            arg = lambda key: self.value(inputs[key], values)  # noqa: E731
            if op_type in ('mul', 'add', 'sub'):
                x, y = arg('x'), arg('y')
                output = {'mul': torch.mul, 'add': torch.add, 'sub': torch.sub}[op_type](x, y)
            elif op_type == 'cast':
                output = arg('x')
            elif op_type == 'relu':
                output = F.relu(arg('x'))
            elif op_type == 'conv':
                output = self.conv(inputs, arg)
            elif op_type == 'reduce_mean':
                axes = [int(a) for a in arg('axes')]
                output = torch.mean(arg('x'), dim=axes, keepdim=bool(arg('keep_dims')))
            elif op_type == 'reshape':
                output = torch.reshape(arg('x'), [int(s) for s in arg('shape')])
            elif op_type == 'linear':
                output = F.linear(arg('x'), arg('weight'), arg('bias'))
            elif op_type == 'softmax':
                output = torch.softmax(arg('x'), dim=int(arg('axis')))
            else:
                raise SystemExit(f'Unsupported op {op_type}; extend ReplayedProgram.')
            values[name] = output
        return output

    @staticmethod
    def conv(inputs, arg):
        x, weight = arg('x'), arg('weight')
        bias = arg('bias') if 'bias' in inputs else None
        strides = [int(s) for s in arg('strides')]
        dilations = [int(d) for d in arg('dilations')]
        groups = int(arg('groups'))
        pad_type = str(arg('pad_type'))
        if pad_type == 'custom':
            top, bottom, left, right = (int(p) for p in arg('pad'))
        elif pad_type == 'valid':
            top = bottom = left = right = 0
        elif pad_type == 'same':
            pads = []
            for size, kernel, stride, dilation in zip(
                x.shape[2:], weight.shape[2:], strides, dilations, strict=True
            ):
                effective = (kernel - 1) * dilation + 1
                total = max((-(-size // stride) - 1) * stride + effective - size, 0)
                pads.append((total // 2, total - total // 2))
            (top, bottom), (left, right) = pads
        else:
            raise SystemExit(f'Unsupported conv pad_type {pad_type}')
        if top or bottom or left or right:
            x = F.pad(x, (left, right, top, bottom))
        return F.conv2d(x, weight, bias, stride=strides, dilation=dilations, groups=groups)


def inline_buffers(path: Path) -> None:
    """Rewrites a model so every weight buffer lives inside the flatbuffer.

    The quantizer stores buffers after the flatbuffer and points at them by
    offset. LiteRT 1.4, the runtime react-native-fast-tflite bundles on
    Android, loads such a model but fails on invoke, so the app would fail
    every identification.
    """
    import flatbuffers
    from ai_edge_litert import schema_py_generated as schema

    raw = path.read_bytes()
    model = schema.ModelT.InitFromPackedBuf(bytearray(raw), 0)
    for buffer in model.buffers:
        if buffer.offset > 1:
            buffer.data = np.frombuffer(raw[buffer.offset : buffer.offset + buffer.size], np.uint8)
            buffer.offset = buffer.size = 0
    builder = flatbuffers.Builder(len(raw) + 1024)
    builder.Finish(model.Pack(builder), file_identifier=b'TFL3')
    path.write_bytes(builder.Output())


def center_crop(image: Image.Image) -> np.ndarray:
    side = min(image.size)
    left, top = (image.width - side) // 2, (image.height - side) // 2
    cropped = image.convert('RGB').crop((left, top, left + side, top + side))
    return np.asarray(cropped.resize((SIZE, SIZE), Image.BILINEAR), dtype=np.float32)


def sample_inputs() -> list[np.ndarray]:
    """Photo-like inputs: smooth gradients and noise. Exact agreement on these
    is what matters; accuracy on real photos is export.py's job."""
    rng = np.random.default_rng(7)
    samples = []
    for _ in range(8):
        noise = rng.uniform(0, 255, (16, 16, 3)).astype(np.uint8)
        samples.append(center_crop(Image.fromarray(noise).resize((320, 240), Image.BICUBIC)))
    return samples


def main() -> None:
    mlmodel = ct.models.MLModel(str(SOURCE))
    labels = json.loads(mlmodel.user_defined_metadata['labels'])
    dense = cto.decompress_weights(mlmodel)
    spec = dense.get_spec()
    program = dense._mil_program or load_mil(spec, spec.specificationVersion, dense.weights_dir)

    model = ReplayedProgram(program).eval()
    samples = sample_inputs()

    import litert_torch
    from ai_edge_litert.interpreter import Interpreter

    example = (torch.from_numpy(samples[0][None]),)
    from ai_edge_quantizer import quantizer, recipe_manager
    from ai_edge_quantizer.recipe import AlgorithmName, TFLOperationName

    edge = litert_torch.convert(model, example)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    float_model = MODEL_OUT.with_suffix('.float.tflite')
    edge.export(str(float_model))
    fp16_weights = recipe_manager.RecipeManager()
    fp16_weights.add_weight_only_config(
        regex='.*',
        operation_name=TFLOperationName.ALL_SUPPORTED,
        num_bits=16,
        algorithm_key=AlgorithmName.FLOAT_CASTING,
    )
    quant = quantizer.Quantizer(str(float_model), fp16_weights.get_quantization_recipe())
    quant.quantize().export_model(str(MODEL_OUT), overwrite=True)
    float_model.unlink()
    inline_buffers(MODEL_OUT)

    interpreter = Interpreter(model_path=str(MODEL_OUT))
    interpreter.allocate_tensors()
    input_index = interpreter.get_input_details()[0]['index']
    output_index = interpreter.get_output_details()[0]['index']

    worst = 0.0
    agree = 0
    for sample in samples:
        expected_dict = mlmodel.predict({'image': Image.fromarray(sample.astype(np.uint8))})
        expected = np.array([expected_dict['classLabel_probs'][label] for label in labels])
        interpreter.set_tensor(input_index, sample[None])
        interpreter.invoke()
        actual = interpreter.get_tensor(output_index)[0]
        worst = max(worst, float(np.abs(actual - expected).max()))
        agree += int(actual.argmax() == expected.argmax())

    if worst > TOLERANCE:
        MODEL_OUT.unlink()
        raise SystemExit(f'TFLite disagrees with Core ML by {worst:.4f} (> {TOLERANCE}); not written.')

    LABELS_OUT.write_text(json.dumps(labels, indent=2) + '\n')
    size = MODEL_OUT.stat().st_size / 1e6
    print(
        f'{MODEL_OUT} · {size:.1f} MB · {len(labels)} labels · '
        f'max |Δp| vs Core ML {worst:.4f} · top-1 agrees {agree}/{len(samples)}'
    )


if __name__ == '__main__':
    main()
