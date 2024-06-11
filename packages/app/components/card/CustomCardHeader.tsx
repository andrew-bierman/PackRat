import React, { useState } from 'react';
import { RButton, RStack, RText as OriginalRText } from '@packrat/ui';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RLink } from '@packrat/ui';
import { useCopyClipboard, useScreenWidth } from 'app/hooks/common';
import { useAuthUser } from 'app/auth/hooks';
import useTheme from '../../hooks/useTheme';
import { CopyPackModal } from 'app/components/pack/CopyPackModal';

const RText: any = OriginalRText;
export const CustomCardHeader = ({ data, title, link, actionsComponent }) => {
  const { isCopied, handleCopyLink } = useCopyClipboard(link);
  const user = useAuthUser();
  const { isDark } = useTheme();
  const [isCopyPackModalOpen, setIsCopyPackModalOpen] = useState(false);

  return (
    <>
      <RStack style={{ flex: 1 }}>
        {typeof title === 'string' ? <RText>{title}</RText> : title}
      </RStack>
      <View>
        <RLink
          href={`/profile/${data?.owner_id?.id || data?.owner_id}`}
          style={{ textDecoration: 'none' }}
        >
          <RText>
            {user?.id === data.owner_id
              ? 'Your Profile'
              : `View ${
                  data.owners && data.owners.length
                    ? data.owners[0].name
                    : 'Profile'
                }`}
          </RText>
        </RLink>
      </View>
      {user?.id !== data.owner_id && (
        <RButton
          onPress={() => {
            setIsCopyPackModalOpen(true);
          }}
          style={{ backgroundColor: 'transparent' }}
        >
          <RText style={{ color: 'black' }}>Copy Pack</RText>
        </RButton>
      )}
      {actionsComponent}
      <CopyPackModal
        currentPack={data}
        isOpen={isCopyPackModalOpen}
        onClose={() => {
          setIsCopyPackModalOpen(false);
        }}
      />
    </>
  );
};
