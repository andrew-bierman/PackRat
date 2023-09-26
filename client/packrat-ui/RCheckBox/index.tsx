import { Check } from '@tamagui/lucide-icons';
import { Checkbox } from 'tamagui';

const RCheckBox = (props) => {
  return (
    <Checkbox {...props} checked={props.checked}>
      <Checkbox.Indicator>
        <Check />
      </Checkbox.Indicator>
    </Checkbox>
  );
};
