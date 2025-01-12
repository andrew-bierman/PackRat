import { LmSwitchRhf, type LmSwitchRhfProps } from '../lib';
import type { StyleProp, ViewStyle } from 'react-native';
export { LmSwitch as Switch } from '../lib';

interface Props
  extends Omit<
    LmSwitchRhfProps<{ label: string | number; value: any }>,
    'name'
  > {
  style?: StyleProp<ViewStyle>;
  name: string;
}

// TODO change the name to "Input" after handling tamagui all components export,
// which is cause of a name collision
export const FormSwitch = (props: Props) => {
  const { style, ...rest } = props;
  return <LmSwitchRhf {...rest} style={style} />;
};
