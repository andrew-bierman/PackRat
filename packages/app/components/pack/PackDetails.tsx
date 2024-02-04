import React, { useEffect, useState } from 'react';
import PackContainer from './PackContainer';
import { DetailsHeader } from '../details/header';
import { createParam } from 'solito';
import { TableContainer } from '../pack_table/Table';
import { fetchUserPacks, selectPackById } from '../../store/packsStore';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSinglePack } from '../../store/singlePackStore';
import { RText } from '@packrat/ui';
import { DetailsComponent } from '../details';
import { Dimensions, Platform, View } from 'react-native';
import { theme } from '../../theme';
import { CLIENT_URL } from '@env';
import ScoreContainer from '../ScoreContainer';
import ChatContainer from '../chat';
import { AddItem } from '../item/AddItem';
import { AddItemModal } from './AddItemModal';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useUserPacks } from 'app/hooks/packs/useUserPacks';
import { useFetchSinglePack } from '../../hooks/packs';
import { RootState } from 'store/store';

const { useParam } = createParam();

export function PackDetails() {
  const searchParams = new URLSearchParams(this.location.search);
  const canCopy = searchParams.get('copy');
  const [packId] = useParam('id');
  console.log(packId, 'packId');
  const link = `${CLIENT_URL}/packs/${packId}`;
  const [firstLoad, setFirstLoad] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;
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

  // useEffect(() => {
  //   if (!packId) return;
  //   dispatch(fetchSinglePack(packId));

  //   // if (userId) dispatch(fetchUserPacks({ ownerId: userId }));
  //   setFirstLoad(false);
  // }, [dispatch, packId, updated]); // TODO updated is a temporary fix to re-render when pack is update, due to bug in store

  const styles = useCustomStyles(loadStyles);
  const currentPackId = currentPack && currentPack._id;

  // check if user is owner of pack, and that pack and user exists
  const isOwner = currentPack && user && currentPack.owner_id === user._id;

  const isError = error !== null;

  if (isLoading && firstLoad) return <RText>Loading...</RText>;

  return (
    <View
      style={[
        styles.mainContainer,
        Platform.OS == 'web'
          ? { minHeight: '100vh' }
          : Dimensions.get('screen').height,
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
                <TableContainer
                  currentPack={currentPack}
                  copy={canCopy}
                  refetch={refetch}
                />
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
                <ScoreContainer
                  type="pack"
                  data={currentPack}
                  isOwner={isOwner}
                />
                <View style={styles.boxStyle}>
                  <ChatContainer />
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
