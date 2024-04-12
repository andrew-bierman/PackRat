import { LmInputRhf, type LmInputRhfProps } from '../lib';

interface Props extends LmInputRhfProps {
  isNumeric?: boolean;
}

// TODO change the name to "Input" after handling tamagui all components export,
// which is cause of a name collision
export const FormInput = (props: Props) => {
  return <LmInputRhf {...props} />;
};
