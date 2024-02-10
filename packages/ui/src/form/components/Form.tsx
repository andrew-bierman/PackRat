import { zodResolver } from '@hookform/resolvers/zod';
import {
  LmFormRhfProvider,
  type LmFormRhfProviderProps,
} from '@tamagui-extras/form';

interface Props extends LmFormRhfProviderProps {
  validationSchema: any;
}

// TODO change the name to "Form" after handling tamagui all components export,
// which is cause of a name collision
export const CustomForm = ({ validationSchema, ...props }: Props) => {
  return (
    <LmFormRhfProvider resolver={zodResolver(validationSchema)} {...props} />
  );
};
