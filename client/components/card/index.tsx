import React, { useRef, useState, useEffect } from 'react';
import {
  VStack,
  Box,
  Divider,
  IconButton,
  Text,
  Menu,
  ThreeDotsIcon,
} from 'native-base';
import {
  TouchableOpacity,
  Clipboard,
  TextInput,
  Pressable,
} from 'react-native';
import { EditableInput } from '../EditableText';
import { theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, Link } from 'expo-router';
import { ThreeDotsMenu } from '../ThreeDotsMenu';
import useTheme from '../../hooks/useTheme';
import { InformUser } from '../../utils/ToastUtils';
import { SearchItem } from '../item/searchItem';
import Loader from '../Loader';
import useCustomStyles from '~/hooks/useCustomStyles';

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
  const [isCopied, setIsCopied] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const titleRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state: any) => state.singlePack.isLoading);
  const user = useSelector((state: any) => state.auth.user);
  const userId = user._id;

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
    InformUser({
      title: 'Link copied to clipboard',
      placement: 'bottom',
      duration: 2000,
    });

    return () => clearTimeout(resetCopyStateTimeout);
  };

  if (type === 'pack') {
    return (
      <Box
        style={styles.mainContainer}
        alignSelf="center"
        alignItems={['center', 'center', 'flex-start', 'flex-start']}
        w={['100%', '100%', '100%', '90%']}
        flexDirection={['column', 'column', 'row', 'row']}
        rounded="lg"
        flexGrow={1}
      >
        <VStack space="4" width="100%" divider={<Divider />}>
          <Box
            px="4"
            pt="4"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <EditableInput
                data={data}
                title={title}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                titleRef={titleRef}
                loading={isLoading}
              />
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Box mx="5">
                <Link href={`/profile/${data.owner_id}`}>
                  <Text>
                    {user._id === data.owner_id
                      ? 'Your Profile'
                      : `View ${
                          data.owners && data.owners.length
                            ? data.owners[0].name
                            : 'Profile'
                        }`}
                  </Text>
                </Link>
              </Box>
              {link && (
                <Box
                  flexDir={'row'}
                  style={{
                    // gap: '5px',
                    alignItems: 'center',
                  }}
                >
                  {isCopied ? (
                    <Box flexDirection="row" alignItems="center">
                      <MaterialCommunityIcons
                        name="check"
                        size={24}
                        color="green"
                        onPress={handleCopyLink}
                      />
                      <Text color="green">Copied</Text>
                    </Box>
                  ) : (
                    <Box flexDirection="row" alignItems="center">
                      <MaterialCommunityIcons
                        name="link"
                        size={24}
                        color="black"
                        onPress={handleCopyLink}
                      />
                      <Text color="black">Copy</Text>
                    </Box>
                  )}
                  {userId === data.owner_id && (
                    <ThreeDotsMenu
                      data={data}
                      titleRef={titleRef}
                      setEditTitle={setEditTitle}
                    />
                  )}
                </Box>
              )}
            </Box>
          </Box>
          <Box
            px="4"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchItem placeholder={'Search Item'} />
          </Box>
          <Box
            px="4"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {content}
          </Box>
          <Box px="4" pb="4">
            {footer}
          </Box>
        </VStack>
      </Box>
    );
  }

  if (type === 'trip') {
    return (
      <Box
        style={styles.mainContainer}
        alignSelf="center"
        alignItems={['center', 'center', 'flex-start', 'flex-start']}
        w={['100%', '100%', '100%', '90%']}
        flexDirection={['column', 'column', 'row', 'row']}
        rounded="lg"
        flexGrow={1}
      >
        <VStack space="4" width="100%" divider={<Divider />}>
          <Box
            px="4"
            pt="4"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>{title}</Box>
            <Box flexDirection="row" alignItems="center">
              <Box mx="5">
                <Link href={`/profile/${data.owner_id && data.owner_id._id}`}>
                  <Text>
                    {user._id === data.owner_id
                      ? 'Your Profile'
                      : `View ${
                          data.owner_id
                            ? '@' + data.owner_id.username
                            : 'Profile'
                        }`}
                  </Text>
                </Link>
              </Box>
              {link && (
                <Box>
                  {isCopied ? (
                    <Box flexDirection="row" alignItems="center">
                      <MaterialCommunityIcons
                        name="check"
                        size={24}
                        color="green"
                        onPress={handleCopyLink}
                      />
                      <Text color="green">Copied</Text>
                    </Box>
                  ) : (
                    <Box flexDirection="row" alignItems="center">
                      <MaterialCommunityIcons
                        name="link"
                        size={24}
                        color="black"
                        onPress={handleCopyLink}
                      />
                      <Text color="black">Copy</Text>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
          <Box
            px="4"
            pb="4"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {content}
          </Box>
          <Box px="4" pb="4">
            {footer}
          </Box>
        </VStack>
      </Box>
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
