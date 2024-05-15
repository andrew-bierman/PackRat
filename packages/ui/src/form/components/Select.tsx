import { LmSelectRhf, type LmSelectRhfProps } from '../lib';
export { LmSelect as Select } from '../lib';

interface Props
  extends LmSelectRhfProps<{ label: string | number; value: any }> {}

// TODO change the name to "Input" after handling tamagui all components export,
// which is cause of a name collision
export const FormSelect = (props: Props) => {
  return <LmSelectRhf {...props} />;
};
