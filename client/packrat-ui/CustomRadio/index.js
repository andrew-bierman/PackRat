import { Label, RadioGroup, SizeTokens, XStack, YStack } from 'tamagui';

function CustomRadio({ props, items }) {
  const { value, baseEssential, ...others } = props;
  return (
    <RadioGroup defaultValue={value} {...others}>
      {items.map((item, i) => (
        <YStack key={i}>
          <RadioGroupItemWithLabel
            value={item}
            label={item}
            baseEssential={baseEssential}
          />
        </YStack>
      ))}
    </RadioGroup>
  );
}

function RadioGroupItemWithLabel({ value, label, baseEssential }) {
  if (baseEssential && value === 'Water') return;
  const id = `radiogroup-${value}`;
  return (
    <XStack alignItems="center">
      <RadioGroup.Item value={value} id={id}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label htmlFor={id}>{label}</Label>
    </XStack>
  );
}

export default CustomRadio;
