import React from 'react';
import { RStack, RText as OriginalRText } from '@packrat/ui';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RLink } from '@packrat/ui';
import { useCopyClipboard, useScreenWidth } from 'app/hooks/common';
import { useAuthUser } from 'app/auth/hooks';
import useTheme from '../../hooks/useTheme';

const RText: any = OriginalRText;
export const CustomCardHeader = ({ data, title, link, actionsComponent }) => {
  const { isCopied, handleCopyLink } = useCopyClipboard(link);
  const user = useAuthUser();
  const { isDark } = useTheme();

  return (
    <>
      <RStack style={{ flex: 1 }}>
        {typeof title === 'string' ? <RText>{title}</RText> : title}
      </RStack>
      <View>
        <RLink
          href={`/profile/${data.owner_id.id || data.owner_id}`}
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
      {link && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isCopied ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="check"
                size={24}
                color="green"
                onPress={() => handleCopyLink(link)}
              />
              <RText color="green">Copied</RText>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="link"
                size={24}
                color={isDark ? 'white' : 'black'}
                onPress={() => handleCopyLink(link)}
              />
              <RText style={{ color: isDark ? 'white' : 'black' }}>Copy</RText>
            </View>
          )}
        </View>
      )}
      {actionsComponent}
    </>
  );
};
