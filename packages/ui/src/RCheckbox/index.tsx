import { Check } from '@tamagui/lucide-icons'
import { Checkbox } from 'tamagui'

const RCheckbox = (props) => {
  return (
    <Checkbox {...props}>
      <Checkbox.Indicator>
        <Check />
      </Checkbox.Indicator>
    </Checkbox>
)}

export default RCheckbox;