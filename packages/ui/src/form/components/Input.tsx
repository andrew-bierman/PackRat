import { LmInputRhf, type LmInputRhfProps } from '@tamagui-extras/form';

interface Props extends LmInputRhfProps {}

// TODO change the name to "Input" after handling tamagui all components export,
// which is cause of a name collision
export const CustomInput = (props: Props) => {
  return <LmInputRhf {...props} />;
};
