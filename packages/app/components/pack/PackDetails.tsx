import React, { useState } from 'react';

import { CLIENT_URL } from '@packrat/config';
import { RText } from '@packrat/ui';
import { useAuthUser } from 'app/auth/hooks';
import Layout from 'app/components/layout/Layout';
import { useIsAuthUserPack } from 'app/hooks/packs/useIsAuthUserPack';
import { usePackId } from 'app/hooks/packs/usePackId';
import { useUserPacks } from 'app/hooks/packs/useUserPacks';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useResponsive from 'app/hooks/useResponsive';
import { FlatList, View } from 'react-native';
import { useFetchSinglePack } from '../../hooks/packs';
import ScoreContainer from '../ScoreContainer';
import ChatContainer from '../chat';
import { DetailsComponent } from '../details';
import { TableContainer } from '../pack_table/Table';
import { AddItemModal } from './AddItemModal';

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
  const { xxs, xxl, xs } = useResponsive();

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

  return (
    <Layout>
      {!isError && (
        <View
          style={{
            minHeight: '100%',
          }}
        >
          <DetailsComponent
            type="pack"
            data={currentPack}
            isLoading={isLoading}
            error={error as any}
            additionalComps={
              <>
                <FlatList
                  data={Object.entries(SECTION)}
                  contentContainerStyle={{ paddingBottom: 50 }}
                  keyExtractor={([key, val]) => val}
                  renderItem={({ item }) => {
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
                          <AddItemModal
                            currentPackId={currentPackId || ''}
                            currentPack={currentPack}
                            isAddItemModalOpen={isAddItemModalOpen}
                            setIsAddItemModalOpen={setIsAddItemModalOpen}
                            // refetch={refetch}
                            setRefetch={() => setRefetch((prev) => !prev)}
                          />
                        ) : null;
                      case SECTION.SCORECARD:
                        return (
                          <View
                            style={{
                              minHeight: xxs ? 800 : xs ? 800 : xxl ? 100 : 800,
                            }}
                          >
                            <ScoreContainer
                              type="pack"
                              data={currentPack}
                              isOwner={isOwner}
                            />
                          </View>
                        );
                      // case SECTION.CHAT:
                      //   return (
                      //     <View style={styles.boxStyle}>
                      //       <ChatContainer
                      //         itemTypeId={currentPackId}
                      //         title="Chat"
                      //         trigger="Open Chat"
                      //       />
                      //     </View>
                      //   );
                      default:
                        return null;
                    }
                  }}
                />
              </>
            }
            link={link}
          />
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          right: 50,
          bottom: 30,
          width: 60,
          height: 60,
          marginBottom: 20,

          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ChatContainer
          itemTypeId={currentPackId}
          title="Chat"
          trigger="Open Chat"
          type="pack"
        />
      </View>
    </Layout>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  console.log('currentTheme', currentTheme);
  return {
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
      padding: 5,
      borderRadius: 10,
      width: '100%',
      minHeight: 400,
    },
  };
};
