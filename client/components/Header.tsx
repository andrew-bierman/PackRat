import type { ReactElement } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import useTheme from '../hooks/useTheme';
import { Icon } from 'native-base';

function Header(): ReactElement {
  const router = useRouter();
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: currentTheme.colors.background,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <StatusBar />
      <TouchableOpacity onPress={() => router.back()} style={{ padding: 12 }}>
        <Icon name="CaretLeft" size={18} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Header;
