import { useState } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { Platform } from 'react-native';

export const useCopyClipboard = (link?: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copiedData,setCopiedData] = useState([])

  const handleCopyLink = (overideLink = '') => {
    const copyLink = link || overideLink;

    if (Platform.OS === 'web') {
      navigator.clipboard
        .writeText(copyLink)
        .then(() => {
       setCopiedData(copyLink)

          console.log('Text copied to clipboard',copyLink);
        })
        .catch((err) => {
          console.error('Failed to copy text to clipboard', err);
        });
    } else {
      Clipboard.setString(copyLink);
      setCopiedData(copyLink)
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
console.log(copiedData,isCopied)
  return { handleCopyLink, isCopied ,copiedData };
};
