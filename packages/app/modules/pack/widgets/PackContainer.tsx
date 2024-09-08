import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { AddItemModal } from 'app/modules/item';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useAuthUser } from 'app/modules/auth';
import { usePackId, useUserPacks, TableContainer } from 'app/modules/pack';
import { DropdownComponent } from '@packrat/ui';

export default function PackContainer({ isCreatingTrip = false }) {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [packIdParam, setPackIdParam] = usePackId();
  const [currentPackId, setCurrentPackId] = useState(packIdParam);
  const user = useAuthUser();

  const [refetch, setRefetch] = useState(false);
  const styles = useCustomStyles(loadStyles);

  // TODO - improve refetch logic. Should be handled entirely by the hook

  let ownerId;
  const {
    data: packs,
    error,
    isLoading,
    refetch: refetchQuery,
  } = useUserPacks(user?.id);

  const oldPacks = useRef([]).current;

  useEffect(() => {
    refetchQuery();
  }, [refetch]);

  useEffect(() => {
    if (packs.length > oldPacks.length) {
      const newPack = packs.find((pack) => !oldPacks.includes(pack.id));
      setCurrentPackId(newPack?.id);
      oldPacks.push(newPack?.id);
    }
  }, packs);
  /**
   * Handles the packing based on the given value.
   *
   * @param {type} val - the value used to select the pack
   * @return {type} none
   */
  const handlePack = (val) => {
    // const selectedPack = packs.find((pack) => pack.name == val);
    const selectedPack = packs.find((pack) => pack.id == val);

    setCurrentPackId(selectedPack?.id);

    if (isCreatingTrip && selectedPack?.id) {
      setPackIdParam(selectedPack?.id);
    }
  };

  const currentPack = packs?.find((pack) => pack.id === currentPackId);

  const dataValues = packs?.map((item) => item?.name) ?? [];

  useEffect(() => {
    const firstPack = packs.find(({ id }) => !!id);
    if (!packIdParam && firstPack?.id && isCreatingTrip) {
      setPackIdParam(firstPack.id);
    }
  }, [packIdParam, packs, isCreatingTrip]);

  return dataValues?.length > 0 ? (
    <View style={styles.mainContainer}>
      <DropdownComponent
        data={packs ?? []}
        textKey={'name'}
        valueKey={'id'}
        value={currentPackId}
        onValueChange={handlePack}
        placeholder={'Select a Pack'}
        width={200}
      />
      {currentPackId && (
        <>
          <AddItemModal
            currentPackId={currentPackId}
            currentPack={currentPack}
            isAddItemModalOpen={isAddItemModalOpen}
            setIsAddItemModalOpen={setIsAddItemModalOpen}
          />

          <TableContainer
            key={`table - ${currentPackId}`}
            currentPack={currentPack}
            selectedPack={currentPackId}
            refetch={refetch}
            setRefetch={setRefetch}
          />
        </>
      )}
    </View>
  ) : null;
}

const loadStyles = () => ({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 35,
    width: '100%',
    padding: 20,
  },
});
