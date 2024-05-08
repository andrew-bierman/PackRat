import { Check } from '@tamagui/lucide-icons';
import { Checkbox, XStack, Label } from 'tamagui';

const RCheckbox = ({ id, value, ...props }) => {
  return (
    <XStack space="$2">
      <Checkbox id={id} {...props}>
        <Checkbox.Indicator>
          <Check />
        </Checkbox.Indicator>
      </Checkbox>
      <Label size="$1" htmlFor={id}>
        {value}
      </Label>
    </XStack>
  );
};

export default RCheckbox;
