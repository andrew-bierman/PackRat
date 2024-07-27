import React, { useState } from 'react';

import { CLIENT_URL } from '@packrat/config';
import { RText } from '@packrat/ui';
import { useAuthUser } from 'app/auth/hooks';
import Layout from 'app/components/layout/Layout';
import { useIsAuthUserPack } from 'app/hooks/packs/useIsAuthUserPack';
import { usePackId } from 'app/hooks/packs/usePackId';
import { useUserPacks } from 'app/hooks/packs/useUserPacks';
import useResponsive from 'app/hooks/useResponsive';
import { FlatList, Platform, View } from 'react-native';
import { useFetchSinglePack } from '../../hooks/packs';
import ScoreContainer from '../ScoreContainer';
// import ChatContainer from '../chat';
import { TextLink } from '@packrat/crosspath';
import { DetailsComponent } from '../details';
import { TableContainer } from '../pack_table/Table';
import { AddItemModal } from './AddItemModal';
import { ImportItemModal } from './ImportItemModal';

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
  const user = useAuthUser();
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isImportItemModalOpen, setIsImportItemModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const { xxs, xxl, xs } = useResponsive();

  const {
    data: currentPack,
    isLoading,
    error,
    refetch: refetchQuery,
  } = useFetchSinglePack(packId);
  const isAuthUserPack = useIsAuthUserPack(currentPack);

  // const styles = useCustomStyles(loadStyles);
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
            marginBottom: 50,
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
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%',
                              justifyContent: 'center',
                              gap: 5,
                            }}
                          >
                            <AddItemModal
                              currentPackId={currentPackId || ''}
                              currentPack={currentPack}
                              isAddItemModalOpen={isAddItemModalOpen}
                              setIsAddItemModalOpen={setIsAddItemModalOpen}
                              // refetch={refetch}
                              setRefetch={() => setRefetch((prev) => !prev)}
                            />
                            <ImportItemModal
                              currentPackId={currentPackId || ''}
                              currentPack={currentPack}
                              isImportItemModalOpen={isImportItemModalOpen}
                              setIsImportItemModalOpen={
                                setIsImportItemModalOpen
                              }
                            />
                          </View>
                        ) : (
                          <RText
                            style={{ textAlign: 'center', fontWeight: 600 }}
                          >
                            <RText style={{ marginRight: 2 }}>
                              You don't have permission to edit this pack. You
                              can create your own pack{' '}
                            </RText>
                            <TextLink href="/pack/create">
                              <RText
                                style={{
                                  color: 'blue',
                                  fontWeight: 700,
                                }}
                              >
                                here
                              </RText>
                            </TextLink>
                          </RText>
                        );
                      case SECTION.SCORECARD:
                        return (
                          <View>
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
      {/* Disable Chat */}
      {/* <View
        style={{
          position: 'absolute',
          right: -40,
          bottom: 20,
          flexDirection: 'row',
          alignSelf: 'flex-end',
        }}
      >
        <ChatContainer
          itemTypeId={currentPackId}
          title="Chat"
          trigger="Open Chat"
          type="pack"
        />
      </View> */}
    </Layout>
  );
}

// const loadStyles = (theme) => {
//   const { currentTheme } = theme;
//   console.log('currentTheme', currentTheme);
//   return {
//     packsContainer: {
//       flexDirection: 'column',
//       minHeight: Platform.OS === 'web' ? '100vh' : '100%',
//       padding: 25,
//       fontSize: 26,
//     },
//     dropdown: {
//       backgroundColor: currentTheme.colors.white,
//     },
//     boxStyle: {
//       padding: 5,
//       borderRadius: 10,
//       width: '100%',
//       minHeight: 400,
//     },
//   };
// };
