import React from 'react';
import { RStack, RSeparator, RText } from '@packrat/ui';
import { View } from 'react-native';
import { EditableInput } from '../EditableText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ThreeDotsMenu } from '../ThreeDotsMenu';

import { SearchItem } from '../item/searchItem';

import useCustomStyles from '../../hooks/useCustomStyles';
import { useCustomCard } from 'hooks/card/useCustomCard';

export const CustomCard = ({
  title,
  content,
  footer,
  link,
  type,
  destination,
  data,
}) => {
  const styles = useCustomStyles(loadStyles);
  const {
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
  } = useCustomCard({ link });

  if (!data) return null;

  if (type === 'pack') {
    return (
      <View
        style={{
          alignSelf: 'center',
          borderRadius: 10,
          ...styles.mainContainer,
        }}
      >
        <RStack style={{ width: '100%', gap: 30 }}>
          <View
            style={{
              padding: 15,
              paddingBottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <EditableInput
                data={data}
                title={title}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                titleRef={titleRef}
                loading={isLoading}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginRight: 20, marginLeft: 20 }}>
                <Link href={`/profile/${data.owner_id}`}>
                  <RText>
                    {user._id === data.owner_id
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
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <MaterialCommunityIcons
                        name="check"
                        size={24}
                        color="green"
                        onPress={handleCopyLink}
                      />
                      <RText color="green">Copied</RText>
                    </View>
                  ) : (
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <MaterialCommunityIcons
                        name="link"
                        size={24}
                        color="black"
                        onPress={handleCopyLink}
                      />
                      <RText color="black">Copy</RText>
                    </View>
                  )}
                  {userId === data.owner_id && (
                    <ThreeDotsMenu
                      data={data}
                      titleRef={titleRef}
                      setEditTitle={setEditTitle}
                    />
                  )}
                </View>
              )}
            </View>
          </View>
          <RSeparator />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 16,
              paddingLeft: 16,
            }}
          >
            <SearchItem placeholder={'Search Item'} />
          </View>
          <RSeparator />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 16,
              paddingLeft: 16,
            }}
          >
            {content}
          </View>
          <RSeparator />
          <View style={{ padding: 16, paddingTop: 0 }}>{footer}</View>
        </RStack>
        {/*         <ToastViewport multipleToasts />
        <NativeToast /> */}
      </View>
    );
  }

  if (type === 'trip') {
    return (
      <View
        style={{
          alignSelf: 'center',
          borderRadius: 10,
          ...styles.mainContainer,
        }}
      >
        <RStack style={{ width: '100%', gap: 30 }}>
          <View
            style={{
              padding: 15,
              paddingBottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>{title}</View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginRight: 20, marginLeft: 20 }}>
                <Link href={`/profile/${data.owner_id && data.owner_id._id}`}>
                  <RText>
                    {user._id === data.owner_id
                      ? 'Your Profile'
                      : `View ${
                          data.owner_id
                            ? '@' + data.owner_id.username
                            : 'Profile'
                        }`}
                  </RText>
                </Link>
              </View>
              {link && (
                <View>
                  {isCopied ? (
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <MaterialCommunityIcons
                        name="check"
                        size={24}
                        color="green"
                        onPress={handleCopyLink}
                      />
                      <RText color="green">Copied</RText>
                    </View>
                  ) : (
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <MaterialCommunityIcons
                        name="link"
                        size={24}
                        color="black"
                        onPress={handleCopyLink}
                      />
                      <RText color="black">Copy</RText>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <RSeparator />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 16,
              paddingLeft: 16,
            }}
          >
            {content}
          </View>
          <RSeparator />
          <View style={{ padding: 16, paddingTop: 0 }}>{footer}</View>
        </RStack>
      </View>
    );
  }
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      backgroundColor: currentTheme.colors.card,
      flex: 1,
      gap: 45,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 15,
      paddingBottom: 15,
      marginBottom: 20,
      border: '1',
    },
    containerMobile: {
      backgroundColor: currentTheme.colors.card,
      flex: 1,
      gap: 45,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
  };
};
