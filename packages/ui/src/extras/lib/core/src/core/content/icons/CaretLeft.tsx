import { memo } from 'react';
import {
  Polyline as _Polyline,
  Rect as _Rect,
  Svg as _Svg,
} from 'react-native-svg';
import { themed } from './themed';

const Icon = (props) => {
  const { color = 'black', size = 24, ...otherProps } = props;
  return (
    <_Svg viewBox="0 0 256 256" {...otherProps} height={size} width={size}>
      <_Rect width="256" height="256" fill="none" />
      <_Polyline
        points="160 208 80 128 160 48"
        fill="none"
        stroke={`${color}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </_Svg>
  );
};
Icon.displayName = 'CaretLeftRegular';
const CaretLeftRegular = memo(themed(Icon));
export { CaretLeftRegular };
