import { useState } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { Platform } from 'react-native';

export const useCopyClipboard = (link: string) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = (overideLink = '') => {
    const copyLink = link || overideLink;

    if (Platform.OS === 'web') {
      navigator.clipboard
        .writeText(copyLink)
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch((err) => {
          console.error('Failed to copy text to clipboard', err);
        });
    } else {
      Clipboard.setString(copyLink);
    }

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    // Style in the future
    // toast.show('Link copied to clipboard');
    // InformUser({
    //   title: 'Link copied to clipboard',
    //   placement: 'bottom',
    //   duration: 2000,
    // });
  };

  return { handleCopyLink, isCopied };
};
