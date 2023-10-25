import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const TouchableIOS = props => {
  return <TouchableHighlight underlayColor="transparent" {...props} />;
};

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableIOS;

export default Touchable;
