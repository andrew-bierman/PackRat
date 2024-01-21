import React from 'react';
import { RText } from '@packrat/ui';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'solito/link';
import { useCopyClipboard } from 'app/hooks/common';
import { useAuthUser } from 'app/hooks/user/useAuthUser';

export const CustomCardHeader = ({ data, title, link, actionsComponent }) => {
  const { isCopied, handleCopyLink } = useCopyClipboard(link);
  const user = useAuthUser();

  return (
    <>
      <View>{title}</View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 20, marginLeft: 20 }}>
          <Link href={`/profile/${data.owner_id}`}>
            <RText>
              {user?._id === data.owner_id
                ? 'Your Profile'
                : `View ${
                    data.owners && data.owners.length
                      ? data.owners[0].name
                      : 'Profile'
                  }`}
            </RText>
          </Link>
        </View>
        {link && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isCopied ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons
                  name="check"
                  size={24}
                  color="green"
                  onPress={handleCopyLink}
                />
                <RText color="green">Copied</RText>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons
                  name="link"
                  size={24}
                  color="black"
                  onPress={handleCopyLink}
                />
                <RText color="black">Copy</RText>
              </View>
            )}
            {actionsComponent}
          </View>
        )}
      </View>
    </>
  );
};
