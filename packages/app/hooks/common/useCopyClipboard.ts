import { useState } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { Platform } from 'react-native';

export const useCopyClipboard = (link?: string) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copiedData,setCopiedData] = useState('')

  const handleCopyLink = (overideLink = '') => {
    const copyLink = link || overideLink;

    if (Platform.OS === 'web') {
      navigator.clipboard
        .writeText(JSON.stringify(copyLink))
        .then(() => {

          console.log('Text copied to clipboard',copyLink);
        })
        .catch((err) => {
          console.error('Failed to copy text to clipboard', err);
        });
    } else {
      Clipboard.setString(JSON.stringify(copyLink));
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
async function getClipboardData(){
  if(Platform.OS === 'web'){
  const itemsParse = await navigator.clipboard.readText()
  try {
    const parsedData = JSON.parse(itemsParse);
    setCopiedData(parsedData);
  } catch (error) {
    console.error("Failed to parse clipboard content", error);
  }
    }
    else{
  const items = await Clipboard.getString();
  try { 
    const parsedItems = JSON.parse(items);
    setCopiedData(parsedItems);
  } catch (error) {
    console.error("Failed to parse clipboard content", error);
  }
    }
}
return { handleCopyLink, isCopied ,copiedData,getClipboardData };
};
