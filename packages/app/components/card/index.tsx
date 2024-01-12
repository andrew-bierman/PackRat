import React, { useRef, useState, useEffect } from 'react';
import {
  RStack,
  RSeparator,
  RText,
  useToastController,
  ToastViewport,
  NativeToast,
  EditableText,
  ThreeDotsMenu,
  YStack,
  Button,
} from '@packrat/ui';
import {
  TouchableOpacity,
  Clipboard,
  TextInput,
  Pressable,
  View,
} from 'react-native';
import { theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, Link } from 'expo-router';
import useTheme from '../../hooks/useTheme';
import { SearchItem } from '../item/searchItem';
import Loader from '../Loader';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useEditTrips, deleteTrip } from 'app/hooks/trips';
import { updatePack, deletePack } from 'app/store/packsStore';

export const CustomCard = ({
  title,
  content,
  footer,
  link,
  type,
  destination,
  data,
}) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  // TODO move to custom hook
  const { editTrips } = useEditTrips();
  const [isCopied, setIsCopied] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const isEditModeRef = useRef(false);
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

  // TODO move to custom hook
  const handleSaveTitle = (title) => {
    console.log({ title });
    if (data.type === 'pack') {
      const packDetails = {
        _id: data._id,
        name: title,
        is_public: data.is_public,
      };

      dispatch(updatePack(packDetails));
    } else {
      const tripDetails = {
        _id: data._id,
        name: title,
        is_public: data.is_public,
      };
      editTrips(tripDetails);
    }
    setEditTitle(false);
  };

  const onOpenChange = (state) => {
    if (!state && isEditModeRef.current) {
      isEditModeRef.current = false;
      setEditTitle(true);
    }
  };

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
              <EditableText
                isLoading={isLoading}
                defaultValue={title}
                isFocused={editTitle}
                onSave={handleSaveTitle}
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
                    <ThreeDotsMenu onOpenChange={onOpenChange}>
                      <YStack space="$1">
                        <Button
                          onPress={() => {
                            isEditModeRef.current = true;
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onPress={() => {
                            if (data.type === 'pack') {
                              dispatch(
                                deletePack({
                                  id: data._id,
                                }),
                              );
                            } else {
                              dispatch(deleteTrip(data._id));
                            }
                            router.replace('/feed');
                          }}
                        >
                          Delete
                        </Button>
                      </YStack>
                    </ThreeDotsMenu>
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
