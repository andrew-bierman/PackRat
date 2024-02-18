import { LmRadioGroupRhf, type LmRadioGroupRhfProps } from '../lib';

interface Props
  extends LmRadioGroupRhfProps<{ label: string | number; value: any }> {}

// TODO change the name to "Input" after handling tamagui all components export,
// which is cause of a name collision
export const CustomRadioGroup = (props: Props) => {
  return <LmRadioGroupRhf {...props} />;
};
