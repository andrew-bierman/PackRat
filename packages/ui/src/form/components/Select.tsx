import { LmSelectRhf, type LmSelectRhfProps } from '../lib';
import { StyleProp, ViewStyle } from 'react-native';
export { LmSelect as Select } from '../lib';

interface Props
  extends LmSelectRhfProps<{ label: string | number; value: any }> {
  style?: StyleProp<ViewStyle>;
}

// TODO change the name to "Input" after handling tamagui all components export,
// which is cause of a name collision
export const FormSelect = (props: Props) => {
  const { style, ...rest } = props;
  return <LmSelectRhf {...rest} style={style} />;
};
