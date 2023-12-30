import { useRef, useState } from 'react';
import { Clipboard } from 'react-native';
import { useSelector } from 'react-redux';
import { InformUser } from '~/utils/ToastUtils';

interface Props {
  link: string;
}

export const useCard = ({ link }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const titleRef = useRef(null);
  const isLoading = useSelector((state: any) => state.singlePack.isLoading);
  const user = useSelector((state: any) => state.auth.user);
  const userId = user._id;

  const handleCopyLink = () => {
    Clipboard.setString(link);

    setIsCopied(true);

    const resetCopyStateTimeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    InformUser({
      title: 'Link copied to clipboard',
      placement: 'bottom',
      duration: 2000,
    });

    return () => clearTimeout(resetCopyStateTimeout);
  };

  return {
    isCopied,
    editTitle,
    setEditTitle,
    titleRef,
    isLoading,
    user,
    userId,
    handleCopyLink,
  };
};
