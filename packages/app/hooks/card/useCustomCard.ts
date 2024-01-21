import { useToastController } from '@packrat/ui';
import { useRouter } from 'expo-router';
import useTheme from 'hooks/useTheme';
import { useRef, useState } from 'react';
import { Clipboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export const useCustomCard = ({ link }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const [isCopied, setIsCopied] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const titleRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state: any) => state.singlePack.isLoading);
  const user = useSelector((state: any) => state.auth.user);
  const userId = user._id;
  const toast = useToastController();

  /**
   * Handles copying the link to the clipboard and updates the copy state.
   *
   * @return {function} A function to clear the timeout for resetting the copy state.
   */
  const handleCopyLink = () => {
    Clipboard.setString(link);

    setIsCopied(true);

    const resetCopyStateTimeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    // Style in the future
    // toast.show('Link copied to clipboard');
    // InformUser({
    //   title: 'Link copied to clipboard',
    //   placement: 'bottom',
    //   duration: 2000,
    // });

    return () => clearTimeout(resetCopyStateTimeout);
  };
  return {
    enableDarkMode,
    enableLightMode,
    isDark,
    isLight,
    currentTheme,
    isCopied,
    setIsCopied,
    editTitle,
    setEditTitle,
    titleRef,
    dispatch,
    router,
    isLoading,
    user,
    userId,
    toast,
    handleCopyLink,
  };
};
