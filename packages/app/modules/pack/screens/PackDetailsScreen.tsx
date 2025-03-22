import React, { useState } from 'react';
import { CLIENT_URL } from '@packrat/config';
import { RButton, RH3, RIconButton, RSpinner, RText } from '@packrat/ui';
import { useAuthUser } from 'app/modules/auth';
import Layout from 'app/components/layout/Layout';
import {
  useIsAuthUserPack,
  usePackId,
  useFetchSinglePack,
  TableContainer,
} from 'app/modules/pack';
import useResponsive from 'app/hooks/useResponsive';
import { FlatList, Platform, View } from 'react-native';
import ScoreContainer from '../../../components/ScoreContainer';
import { DetailsComponent } from '../../../components/details';
import { ImportItemModal, AddItemModal } from 'app/modules/item';
import { FeedPreview } from 'app/modules/feed';
import LargeCard from 'app/components/card/LargeCard';
import useTheme from 'app/hooks/useTheme';
import Chat from 'app/components/chat';
import { useRouter } from 'app/hooks/router';
import { ConnectionGate } from 'app/components/ConnectionGate';
import { AsyncView } from 'app/components/AsyncView/AsyncView';
import { TextLink } from 'solito/link';

const SECTION = {
  TABLE: 'TABLE',
  CTA: 'CTA',
  SCORE_SIMILAR: 'SCORE_SIMILAR',
  CHAT: 'CHAT',
};

export function PackDetailsScreen() {
  const { currentTheme } = useTheme();
  // const [canCopy, setCanCopy] = useParam('canCopy')
  const canCopy = false;
  const [packId] = usePackId();
  const link = `${CLIENT_URL}/packs/${packId}`;
  const user = useAuthUser();
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isImportItemModalOpen, setIsImportItemModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const { xxs, xxl, xs, sm } = useResponsive();

  const {
    data: currentPack,
    isLoading,
    error,
    refetch: refetchQuery,
  } = useFetchSinglePack(packId);
  const isAuthUserPack = useIsAuthUserPack(currentPack);
  const router = useRouter();

  // const styles = useCustomStyles(loadStyles);
  const currentPackId = currentPack && currentPack.id;
  // check if user is owner of pack, and that pack and user exists
  const isOwner = currentPack && user && currentPack.owner_id === user.id;
  return (
    <Layout
      customStyle={{ alignItems: 'stretch' }}
      bottomRightComponent={
        isAuthUserPack && (
          <ConnectionGate mode="connected">
            <Chat
              itemTypeId={currentPackId}
              type="pack"
              title="Chat"
              trigger="Open Chat"
            />
          </ConnectionGate>
        )
      }
    >
      <AsyncView
        isLoading={isLoading}
        isError={!!error}
        loadingComponent={<RSpinner />}
        errorComponentProps={{
          title: 'Error Loading Pack',
          message: error?.message ?? 'Error Loading Pack',
        }}
      >
        <View style={{ minHeight: '100%', paddingBottom: 80 }}>
          <DetailsComponent
            isLoading={isLoading}
            type="pack"
            data={currentPack}
            additionalComps={
              <>
                <ConnectionGate mode="connected">
                  {isAuthUserPack ? (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        gap: 5,
                        marginBottom: 16,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: '#232323',
                          borderRadius: 12,
                        }}
                      >
                        <AddItemModal
                          showTrigger={true}
                          currentPackId={currentPackId || ''}
                          currentPack={currentPack}
                          isAddItemModalOpen={isAddItemModalOpen}
                          setIsAddItemModalOpen={setIsAddItemModalOpen}
                          setRefetch={() => setRefetch((prev) => !prev)}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: 'transparent',
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: currentTheme.colors.cardBorderPrimary,
                        }}
                      >
                        <ImportItemModal
                          currentPackId={currentPackId || ''}
                          currentPack={currentPack}
                          isImportItemModalOpen={isImportItemModalOpen}
                          setIsImportItemModalOpen={setIsImportItemModalOpen}
                        />
                      </View>
                    </View>
                  ) : (
                    <RText
                      style={{
                        textAlign: 'center',
                        fontWeight: 600,
                        marginBottom: 16, // Spacing below the text
                      }}
                    >
                      <RText style={{ marginRight: 2 }}>
                        You don't have permission to edit this pack. You can
                        create your own pack{' '}
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
                  )}
                </ConnectionGate>

                <FlatList
                  data={Object.entries(SECTION)}
                  contentContainerStyle={{ paddingBottom: 80 }}
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
                      case SECTION.SCORE_SIMILAR:
                        return (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: sm ? 'column' : 'row',
                              gap: 8,
                            }}
                          >
                            <View style={{ flex: 1 }}>
                              <ScoreContainer
                                type="pack"
                                data={currentPack}
                                isOwner={isOwner}
                              />
                            </View>
                            <View style={{ flex: 1 }}>
                              <ConnectionGate mode="connected">
                                <LargeCard
                                  customStyle={{
                                    width: '100%',
                                    backgroundColor:
                                      currentTheme.colors.background,
                                    borderWidth: 1,
                                    borderColor:
                                      currentTheme.colors.cardBorderPrimary,
                                    paddingBottom: 24,
                                    marginTop: 28,
                                    paddingTop: 0,
                                  }}
                                >
                                  <RH3
                                    style={{
                                      color: currentTheme.colors.text,
                                      fontSize: 24,
                                      alignSelf: 'center',
                                    }}
                                  >
                                    Similar Packs
                                  </RH3>
                                  <FeedPreview
                                    feedType="similarPacks"
                                    id={currentPackId}
                                  />
                                </LargeCard>
                              </ConnectionGate>
                            </View>
                          </View>
                        );
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
      </AsyncView>
    </Layout>
  );
}
