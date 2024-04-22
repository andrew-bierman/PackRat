import React, { useState } from 'react';

import PackContainer from './PackContainer';
import { DetailsHeader } from '../details/header';
import { TableContainer } from '../pack_table/Table';
import { RText } from '@packrat/ui';
import { DetailsComponent } from '../details';
import { Dimensions, Platform, View, FlatList } from 'react-native';
import { theme } from '../../theme';
import { CLIENT_URL } from '@env';
import ScoreContainer from '../ScoreContainer';
import ChatContainer from '../chat';
import { AddItem } from '../item/AddItem';
import { AddItemModal } from './AddItemModal';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useUserPacks } from 'app/hooks/packs/useUserPacks';
import { usePackId } from 'app/hooks/packs/usePackId';
import { useFetchSinglePack } from '../../hooks/packs';
import { useAuthUser } from 'app/auth/hooks';
import { useIsAuthUserPack } from 'app/hooks/packs/useIsAuthUserPack';

const SECTION = {
  TABLE: 'TABLE',
  CTA: 'CTA',
  SCORECARD: 'SCORECARD',
  CHAT: 'CHAT',
};

export function PackDetails() {
  // const [canCopy, setCanCopy] = useParam('canCopy')
  const canCopy = false;
  const [packId] = usePackId();
  const link = `${CLIENT_URL}/packs/${packId}`;
  const [firstLoad, setFirstLoad] = useState(true);
  const user = useAuthUser();
  const userId = user?.id;
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const { data: userPacks, isLoading: isUserPacksLoading } =
    useUserPacks(userId);
  const {
    data: currentPack,
    isLoading,
    error,
    refetch: refetchQuery,
  } = useFetchSinglePack(packId);
  const isAuthUserPack = useIsAuthUserPack(currentPack);

  const styles = useCustomStyles(loadStyles);
  const currentPackId = currentPack && currentPack.id;

  // check if user is owner of pack, and that pack and user exists
  const isOwner = currentPack && user && currentPack.owner_id === user.id;

  const isError = error !== null;

  if (isLoading) return <RText>Loading...</RText>;

  console.log(
    'hhhhhhhhhhhhhhhhhhheeeeeeeeeeeeeeeeeeeeellllllllllllllllllooooooooooooooooooooooo',
  );

  return (
    <View
      style={[
        styles.mainContainer,
        Platform.OS == 'web'
          ? { minHeight: '100vh' }
          : { minHeight: Dimensions.get('screen').height },
      ]}
    >
      {!isError && (
        <>
          <DetailsComponent
            type="pack"
            data={currentPack}
            isLoading={isLoading}
            error={error}
            additionalComps={
              <>
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={Object.entries(SECTION)}
                    contentContainerStyle={{ paddingBottom: 350 }}
                    keyExtractor={([key, val]) => val}
                    renderItem={({ item }) => {
                      {
                        switch (item[1]) {
                          case SECTION.TABLE:
                            return (
                              <TableContainer
                                currentPack={currentPack}
                                copy={canCopy}
                                hasPermissions={isAuthUserPack}
                              />
                            );
                          case SECTION.CTA:
                            return isAuthUserPack ? (
                              <View style={styles.boxStyle}>
                                <AddItemModal
                                  currentPackId={currentPackId}
                                  currentPack={currentPack}
                                  isAddItemModalOpen={isAddItemModalOpen}
                                  setIsAddItemModalOpen={setIsAddItemModalOpen}
                                  // refetch={refetch}
                                  setRefetch={() => setRefetch((prev) => !prev)}
                                />
                              </View>
                            ) : null;
                          case SECTION.SCORECARD:
                            return (
                              <ScoreContainer
                                type="pack"
                                data={currentPack}
                                isOwner={isOwner}
                              />
                            );
                          case SECTION.CHAT:
                            return (
                              <View style={styles.boxStyle}>
                                <ChatContainer
                                  itemTypeId={currentPackId}
                                  title="Chat"
                                  trigger="Open Chat"
                                />
                              </View>
                            );
                          default:
                            return null;
                        }
                      }
                    }}
                  />
                </View>
              </>
            }
            link={link}
          />
        </>
      )}
    </View>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      backgroundColor: currentTheme.colors.background,
      flexDirection: 'column',
      gap: 15,
      fontSize: 18,
      width: '100%',
    },
    packsContainer: {
      flexDirection: 'column',
      minHeight: '100vh',

      padding: 25,
      fontSize: 26,
    },
    dropdown: {
      backgroundColor: currentTheme.colors.white,
    },
    boxStyle: {
      padding: 10,
      borderRadius: 10,
      width: '100%',
      minHeight: 100,
    },
  };
};
