import { Box, Button, Input, Select, Text } from 'native-base';
import { useEffect, useState } from 'react';

import DropdownComponent from '../Dropdown';
import useGetPacks from '../../hooks/useGetPacks';
import { AddItem } from '../item/AddItem';
import { TableContainer } from '../pack_table/Table';
// import { useAuth } from "../../auth/provider";
import { useSelector } from 'react-redux';
import {
  fetchUserPacks,
  selectPackById,
  selectAllPacks,
} from '../../store/packsStore';
import { updateNewTripPack } from '../../store/tripsStore';
import { useDispatch } from 'react-redux';

import { CustomModal } from '../modal';
import { AddItemModal } from './AddItemModal';
import useCustomStyles from '~/hooks/useCustomStyles';

export default function PackContainer({ isCreatingTrip = false }) {
  const dispatch = useDispatch();
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const packs = useSelector(selectAllPacks);

  const newTrip = useSelector((state) => state.trips.newTrip);

  const [currentPackId, setCurrentPackId] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const styles = useCustomStyles(loadStyles);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserPacks({ ownerId: user?._id }));
    }
  }, [dispatch, user?._id, refetch]);

  /**
   * Handles the packing based on the given value.
   *
   * @param {type} val - the value used to select the pack
   * @return {type} none
   */
  const handlePack = (val) => {
    const selectedPack = packs.find((pack) => pack.name == val);

    setCurrentPackId(selectedPack?._id);

    if (isCreatingTrip && selectedPack?._id) {
      dispatch(updateNewTripPack(selectedPack?._id));
    }
  };
  const currentPack = useSelector((state) =>
    selectPackById(state, currentPackId),
  );

  const dataValues = packs.map((item) => item?.name) ?? [];

  return dataValues?.length > 0 ? (
    <Box style={styles.mainContainer}>
      <DropdownComponent
        data={dataValues}
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
    </Box>
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
