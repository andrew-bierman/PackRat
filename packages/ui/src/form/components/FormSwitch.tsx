import { LmSwitchRhf, type LmSwitchRhfProps } from '../lib';
import type { StyleProp, ViewStyle } from 'react-native';
export { LmSwitch as Switch } from '../lib';

interface Props
  extends LmSwitchRhfProps<{ label: string | number; value: any }> {
  style?: StyleProp<ViewStyle>;
}

// TODO change the name to "Input" after handling tamagui all components export,
// which is cause of a name collision
export const FormSwitch = (props: Props) => {
  const { style, ...rest } = props;
  return <LmSwitchRhf {...rest} style={style} />;
};
