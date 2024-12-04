import React from 'react';
import useTheme from 'app/hooks/useTheme';
import { RText } from '@packrat/ui';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WifiOff, X } from '@tamagui/lucide-icons';
import { useStorage } from 'app/hooks/storage/useStorage';

export function OfflineMessage() {
  const { currentTheme } = useTheme();
  const { top } = useSafeAreaInsets();
  const { showOfflineStatusBanner, onCloseBanner } =
    useOfflineStatusBannerState();

  return showOfflineStatusBanner ? (
    <View
      style={{
        marginTop: top,
        backgroundColor: currentTheme.colors.background,
        flexDirection: 'row',
        padding: 8,
        gap: 8,
        alignItems: 'stretch',
      }}
    >
      <WifiOff />
      <RText
        style={{
          color: currentTheme.colors.text,
          textAlign: 'center',
          fontWeight: 700,
          lineHeight: 20,
          fontSize: 14,
        }}
      >
        You are currently offline. Please check your internet connection.
      </RText>
      <TouchableOpacity onPress={onCloseBanner}>
        <X />
      </TouchableOpacity>
    </View>
  ) : null;
}

const useOfflineStatusBannerState = () => {
  const [[isLoading, showOfflineStatusBannerStr], setShowOfflineStatusBanner] =
    useStorage('showOfflineStatusBanngyer');
  const showOfflineStatusBanner =
    !isLoading && showOfflineStatusBannerStr === null;

  const onCloseBanner = () => setShowOfflineStatusBanner('false');

  return { showOfflineStatusBanner, onCloseBanner };
};
