import { Linking, Platform } from 'react-native';

export const openExternalLink = async (link: string) => {
  if (Platform.OS === 'web') {
    window.open(link, '_blank', 'noopener,noreferrer');
  } else {
    const supported = await Linking.canOpenURL(link);
    if (!supported) {
      return;
    }

    await Linking.openURL(link);
  }
};
