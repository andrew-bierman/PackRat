import React, { type FC, type ReactNode, useEffect } from 'react';
import {
  View,
  Platform,
  StatusBar,
  StyleSheet,
  type ViewProps,
  Dimensions,
  Modal,
  SafeAreaView,
} from 'react-native';

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
  useEffect(() => {
    StatusBar.setHidden(isFullScreen);
  }, [isFullScreen]);
  const content = <View>{children}</View>;

  return isFullScreen ? (
    <Modal visible>
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        {content}
      </SafeAreaView>
    </Modal>
  ) : (
    content
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
