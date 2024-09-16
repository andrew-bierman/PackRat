import React, { useState } from 'react';

import { CLIENT_URL } from '@packrat/config';
import { RH3, RSpinner, RText } from '@packrat/ui';
import { useAuthUser } from 'app/modules/auth';
import Layout from 'app/components/layout/Layout';
import {
  useIsAuthUserPack,
  usePackId,
  useFetchSinglePack,
  TableContainer,
} from 'app/modules/pack';
import useResponsive from 'app/hooks/useResponsive';
import { FlatList, View } from 'react-native';
import ScoreContainer from '../../../components/ScoreContainer';
import { TextLink } from '@packrat/crosspath';
import { DetailsComponent } from '../../../components/details';
import { ImportItemModal, AddItemModal } from 'app/modules/item';
import { FeedPreview } from 'app/modules/feed';
import LargeCard from 'app/components/card/LargeCard';
import useTheme from 'app/hooks/useTheme';
import ChatModalTrigger from 'app/components/chat';

const SECTION = {
  TABLE: 'TABLE',
  CTA: 'CTA',
  SCORECARD: 'SCORECARD',
  CHAT: 'CHAT',
  SIMILAR_PACKS: 'SIMILAR_PACKS',
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

  if (isLoading)
    return (
      <Layout>
        <RSpinner />
      </Layout>
    );

  return (
    <Layout customStyle={{ alignItems: 'stretch' }}>
      {!isError && (
        <View
          style={{
            minHeight: '100%',
            paddingBottom: 80,
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
                      case SECTION.SIMILAR_PACKS:
                        return (
                          <LargeCard
                            customStyle={{
                              width: '100%',
                              backgroundColor:
                                currentTheme.colors.secondaryBlue,
                              paddingBottom: 24,
                              marginTop: 20,
                              paddingTop: 0,
                            }}
                          >
                            <RH3
                              style={{
                                // textTransform: 'capitalize',
                                color: currentTheme.colors.text,
                                fontSize: 24,
                                // fontWeight: 'bold',
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
      )}
      {/* Disable Chat */}
      <View
        style={{
          position: 'absolute',
          right: -40,
          bottom: 20,
          flexDirection: 'row',
          alignSelf: 'flex-end',
        }}
      >
        <ChatModalTrigger
          itemTypeId={currentPackId}
          title="Chat"
          trigger="Open Chat"
          type="pack"
        />
      </View>
    </Layout>
  );
}
