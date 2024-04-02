import { useEffect } from 'react';
import { useFonts } from 'expo-font';
// import { SplashScreen } from 'expo-router';

// Expo vector icons
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';
import Inter from '@tamagui/font-inter/otf/Inter-Medium.otf';
import InterBold from '@tamagui/font-inter/otf/Inter-Bold.otf';

const FontLoader = ({ children }) => {
  const [loaded] = useFonts({
    Inter,
    InterBold,
    // Cache all icon fonts
    ...AntDesign.font,
    ...Entypo.font,
    ...EvilIcons.font,
    ...Feather.font,
    ...FontAwesome.font,
    ...FontAwesome5.font,
    ...Fontisto.font,
    ...Foundation.font,
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
    ...MaterialIcons.font,
    ...Octicons.font,
    ...SimpleLineIcons.font,
    ...Zocial.font,
  });

  useEffect(() => {
    if (loaded) {
      // SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return children;
};

export default FontLoader;
