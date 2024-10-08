import React, { type FC, type ReactNode, useEffect } from 'react';
import {
  View,
  Platform,
  StatusBar,
  StyleSheet,
  type ViewProps,
  Dimensions,
} from 'react-native';
import { useWebFullScreen } from './useWebFullScreen';

interface FullScreenProps {
  isFullScreen: boolean;
  children: ReactNode;
  defaultStyles: ViewProps['style'];
}

export const FullScreen: FC<FullScreenProps> = ({
  isFullScreen,
  children,
  defaultStyles = {},
}) => {
  const webFullScreen = useWebFullScreen();

  useEffect(() => {
    if (isFullScreen) {
      webFullScreen.enterFullScreen();
    } else {
      webFullScreen.exitFullScreen();
    }
  }, [isFullScreen]);

  return (
    <View
      ref={Platform.OS === 'web' ? webFullScreen.elementRef : null}
      style={isFullScreen ? styles.fullScreen : defaultStyles}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    position: 'relative',
    top: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    zIndex: 9999,
  },
});
