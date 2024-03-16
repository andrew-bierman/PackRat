import { RadioGroup as OriginalRadioGroup, Label, XStack } from 'tamagui';

const RadioGroup: any = OriginalRadioGroup;

const RRadio = ({ value, data, onValueChange, ...props }) => {
  if (!data) return null;
const RRadio = ({ value, data, onValueChange, ...props }) => {
  if (!data) return null;
  return (
    <RadioGroup
      value={value}
      size="$4"
      space="$2"
      onValueChange={onValueChange}
      {...props}
    >
      {data.map((value) => (
        <XStack space="$2">
          <RadioGroup.Item value={value} key={value}>
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          <Label htmlFor={value}>{value}</Label>
        </XStack>
      ))}
    </RadioGroup>
  );
};
export default RRadio;
