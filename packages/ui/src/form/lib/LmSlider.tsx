import {
  ColorTokens,
  Slider as OriginalSlider,
  SliderProps,
  SliderThumbProps,
  styled,
  Text,
  XStack as OriginalXStack,
} from 'tamagui';
import { useId, useState } from 'react';
import { LmFormFieldContainer } from './LmFormFieldContainer';
import { LmFormContainerBaseTypes } from './formContainerTypes';

const XStack: any = OriginalXStack;
const Slider: any = OriginalSlider;

interface CustomSliderTrackProps {
  colorCustom?: string;
  children: (props: any) => React.ReactElement;
}

const CustomSliderTrack = styled(Slider.Track, {
  variants: {
    colorCustom: {
      ':string': (color) => {
        return {
          backgroundColor: color,
        } as any;
      },
    },
  } as const,
}) as React.FC<CustomSliderTrackProps>;

const CustomSliderTrackActive = styled(Slider.TrackActive, {
  variants: {
    colorCustom: {
      ':string': (color: string) => {
        return {
          backgroundColor: color,
        } as any;
      },
    },
  } as const,
});

export type LmSliderProps = SliderProps &
  LmFormContainerBaseTypes & {
    defaultValue?: number[];
    color?: ColorTokens | string;
    colorActiveOnly?: boolean;
    thumbProps?: SliderThumbProps;
    showValue?: boolean;
  };

export function LmSlider({
  thumbProps,
  color,
  defaultValue = [0],
  label,
  labelProps,
  error,
  required,
  helperText,
  helperTextProps,
  labelInline,
  colorActiveOnly,
  showValue,
  containerProps,
  ...sliderProps
}: LmSliderProps) {
  const id = useId();
  const [value, setValue] = useState<number[]>(defaultValue);
  const trackColor = color ? `${color}Dark` : undefined;
  return (
    <LmFormFieldContainer
      id={id}
      label={label}
      error={error}
      required={required}
      labelProps={labelProps}
      size={sliderProps.size}
      labelInline={labelInline}
      helperText={helperText}
      helperTextProps={helperTextProps}
      alignItems={labelInline ? 'center' : undefined}
      {...containerProps}
    >
      <XStack space alignItems={'center'}>
        <Slider
          size="$2"
          width={150 as any}
          defaultValue={value}
          max={5}
          step={1}
          {...sliderProps}
          onValueChange={(v) => {
            setValue(v);
            if (typeof sliderProps.onValueChange === 'function') {
              sliderProps.onValueChange(v);
            }
          }}
        >
          <CustomSliderTrack
            colorCustom={!colorActiveOnly ? trackColor : undefined}
          >
            {(props: any) => (
              <CustomSliderTrackActive colorCustom={trackColor} {...props} />
            )}
          </CustomSliderTrack>
          <Slider.Thumb
            bordered={false}
            circular
            pressTheme={false}
            hoverTheme={false}
            focusTheme={false}
            size={'$1'}
            index={0}
            backgroundColor={color}
            {...thumbProps}
          />
        </Slider>
        {showValue && <Text>{value[0]}</Text>}
      </XStack>
    </LmFormFieldContainer>
  );
}
