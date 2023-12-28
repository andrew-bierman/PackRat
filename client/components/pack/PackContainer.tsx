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
import { View } from 'react-native';
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
  const [currentPackName, setCurrentPackName] = useState("");
  const [refetch, setRefetch] = useState(false);
  const styles = useCustomStyles(loadStyles);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserPacks({ ownerId: user?._id }));
    }
  }, [dispatch]);

  /**
   * Handles the packing based on the given value.
   *
   * @param {type} val - the value used to select the pack
   * @return {type} none
   */
  const handlePack = (val) => {
    const selectedPack = packs.find((pack) => pack.name == val);
    setCurrentPackName(selectedPack?.name)
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
    <View style={styles.mainContainer}>
      <DropdownComponent
        data={dataValues}
        value={currentPackName}
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
// import { useEffect, useState } from 'react';
// import DropdownComponent from '../Dropdown';
// // import useGetPacks from '../../hooks/useGetPacks';
// import { TableContainer } from '../pack_table/Table';
// // import { useAuth } from "../../auth/provider";
// import { useSelector } from 'react-redux';
// import { useUserPacks } from '../../hooks/packs/useUserPacks';
// import {
//   fetchUserPacks,
//   selectPackById,
//   selectAllPacks,
// } from '../../store/packsStore';
// import { updateNewTripPack } from '../../store/tripsStore';
// import { useDispatch } from 'react-redux';
// import { View } from 'react-native';
// import { CustomModal } from '../modal';
// import { AddItemModal } from './AddItemModal';
// import useCustomStyles from '~/hooks/useCustomStyles';

// export default function PackContainer({ isCreatingTrip = false }) {
//   const dispatch = useDispatch();
//   const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

//   const user = useSelector((state) => state.auth.user);
//   // const packs = useSelector(selectAllPacks);

//   const newTrip = useSelector((state) => state.trips.newTrip);

//   const [currentPackId, setCurrentPackId] = useState(null);
//   const [refetch, setRefetch] = useState(false);
//   const styles = useCustomStyles(loadStyles);

//   // useEffect(() => {
//   //   if (user?._id) {
//   //     dispatch(fetchUserPacks({ ownerId: user?._id }));
//   //   }
//   // }, [dispatch, user?._id, refetch]);

//   // TODO - improve refetch logic. Should be handled entirely by the hook
//   const {
//     data: packs,
//     error,
//     isLoading,
//     refetch: refetchQuery,
//   } = useUserPacks((ownerId = user?._id));

//   useEffect(() => {
//     refetchQuery();
//   }, [refetch]);

//   /**
//    * Handles the packing based on the given value.
//    *
//    * @param {type} val - the value used to select the pack
//    * @return {type} none
//    */
//   const handlePack = (val) => {
//     const selectedPack = packs.find((pack) => pack.name == val);

//     setCurrentPackId(selectedPack?._id);

//     if (isCreatingTrip && selectedPack?._id) {
//       dispatch(updateNewTripPack(selectedPack?._id));
//     }
//   };
//   // const currentPack = useSelector((state) =>
//   //   selectPackById(state, currentPackId),
//   // );

//   const currentPack = packs.find((pack) => pack._id === currentPackId);

//   // const dataValues = packs.map((item) => item?.name) ?? [];
//   const dataValues = packs.map((item) => item?.name) ?? [];
//   const uniqueDataValues = [...new Set(dataValues)];



//   return dataValues?.length > 0 ? (
//     <View style={styles.mainContainer}>
//       <DropdownComponent
//         data={uniqueDataValues}
//         value={currentPackId}
//         onValueChange={handlePack}
//         placeholder={'Select a Pack'}
//         width={300}
//       />
//       {currentPackId && (
//         <>
//           <AddItemModal
//             currentPackId={currentPackId}
//             currentPack={currentPack}
//             isAddItemModalOpen={isAddItemModalOpen}
//             setIsAddItemModalOpen={setIsAddItemModalOpen}
//           />
//           <TableContainer
//             key={`table - ${currentPackId}`}
//             currentPack={currentPack}
//             selectedPack={currentPackId}
//             refetch={refetch}
//             setRefetch={setRefetch}
//           />
//         </>
//       )}
//     </View>
//   ) : null;
// }

// const loadStyles = () => ({
//   mainContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: 35,
//     width: '100%',
//     padding: 20,
//   },
// });


