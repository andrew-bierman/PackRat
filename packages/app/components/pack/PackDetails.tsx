import React, { useCallback, useState } from 'react';
import PackContainer from './PackContainer';
import { DetailsHeader } from '../details/header';
import { TableContainer } from '../pack_table/Table';
import { RScrollView, RText } from '@packrat/ui';
import { DetailsComponent } from '../details';
import {
  Dimensions,
  Platform,
  View,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
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

const SECTION = {
  TABLE: 'TABLE',
  CTA: 'CTA',
  SCORECARD: 'SCORECARD',
  CHAT: 'CHAT',
};

export function PackDetails() {
  const styles = useCustomStyles(loadStyles);

  const canCopy = false;
  const [packId] = usePackId();
  const link = `${CLIENT_URL}/packs/${packId}`;
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const user = useAuthUser();
  const userId = user?._id;
  const {
    data: userPacks,
    isLoading: isUserPacksLoading,
    refetch: refetchUserPacks,
  } = useUserPacks(userId);
  const {
    data: currentPack,
    isLoading,
    error,
    refetch: refetchSinglePack,
  } = useFetchSinglePack(packId);
  const currentPackId = currentPack && currentPack._id;
  // check if user is owner of pack, and that pack and user exists
  const isOwner = currentPack && user && currentPack.owner_id === user._id;
  const isError = error !== null;

  if (isLoading) return <Text>Loading...</Text>;

  const refetchData = () => {
    refetchUserPacks();
    refetchSinglePack();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refetchData();
      setRefreshing(false);
    }, 2000);
  }, []);

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
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
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
                              />
                            );
                            break;
                          case SECTION.CTA:
                            return (
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
                            );
                            break;
                          case SECTION.SCORECARD:
                            return (
                              <ScoreContainer
                                type="pack"
                                data={currentPack}
                                isOwner={isOwner}
                              />
                            );
                            break;
                          case SECTION.CHAT:
                            return (
                              <View style={styles.boxStyle}>
                                <ChatContainer title={''} trigger={''} />
                              </View>
                            );
                            break;
                          default:
                            return <Text></Text>;
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
