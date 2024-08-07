import { useEffect, useState } from 'react';
import { AddItem } from '../item/AddItem';
import { TableContainer } from '../pack_table/Table';
import { useUserPacks } from '../../hooks/packs/useUserPacks';
import { View } from 'react-native';
import { AddItemModal } from './AddItemModal';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useAuthUser } from 'app/auth/hooks';
import { usePackId } from 'app/hooks/packs';
import { createParam } from '@packrat/crosspath';
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

  useEffect(() => {
    refetchQuery();
  }, [refetch]);

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
