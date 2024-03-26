import { useEffect, useState } from 'react';
import DropdownComponent from '../Dropdown';
import { AddItem } from '../item/AddItem';
import { TableContainer } from '../pack_table/Table';
import { useUserPacks } from '../../hooks/packs/useUserPacks';
import { View } from 'react-native';
import { AddItemModal } from './AddItemModal';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useAuthUser } from 'app/auth/hooks';
import { usePackId } from 'app/hooks/packs';
import { createParam } from '@packrat/crosspath';

export default function PackContainer({ isCreatingTrip = false }) {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [packIdParam] = usePackId();
  const [currentPackId, setCurrentPackId] = useState(packIdParam);
  const user = useAuthUser();
  console.log({ currentPackId });

  const [refetch, setRefetch] = useState(false);
  const styles = useCustomStyles(loadStyles);
  const { useParams } = createParam<{ id: number }>();
  const {params, setParams} = useParams('id');

  // TODO - improve refetch logic. Should be handled entirely by the hook

  let ownerId;
  const {
    data: packs,
    error,
    isLoading,
    refetch: refetchQuery,
  } = useUserPacks(user?._id);

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
    const selectedPack = packs.find((pack) => pack._id == val);

    setCurrentPackId(selectedPack?._id);

    if (isCreatingTrip && selectedPack?._id) {
     setParams({
      id: selectedPack?._id
     }) 
    }
  };

  const currentPack = packs?.find((pack) => pack._id === currentPackId);

  const dataValues = packs?.map((item) => item?.name) ?? [];

  return dataValues?.length > 0 ? (
    <View style={styles.mainContainer}>
      <DropdownComponent
        data={packs ?? []}
        textKey={'name'}
        valueKey={'_id'}
        value={currentPackId}
        onValueChange={handlePack}
        placeholder={'Select a Pack'}
        width={300}
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
