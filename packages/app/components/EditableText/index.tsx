import React, { useEffect, useState } from 'react';
import { theme } from '../../theme';
import { TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { updatePack } from '../../store/packsStore';
// import { editTrip } from '../../store/tripsStore';
import { useEditTrips } from 'app/hooks/trips';
import LoadingPlaceholder from '../loader';
interface EditableInputProps {
  data: {
    _id: string;
    name: string;
    is_public: boolean;
    type: string;
  };
  title: string;
  editTitle: boolean;
  setEditTitle: any;
  titleRef: any;
  loading: boolean;
}
export const EditableInput: React.FC<EditableInputProps> = ({
  data,
  title,
  editTitle,
  setEditTitle,
  titleRef,
  loading,
}) => {
  const [headerTitle, setHeaderTitle] = useState('');
  const { editTrips } = useEditTrips();
  useEffect(() => {
    if (title) {
      setHeaderTitle(title);
    }
  }, [title]);
  const dispatch = useDispatch();
  return (
    <>
      {loading && <LoadingPlaceholder color="#e2e1eb" />}
      <TextInput
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.colors.textPrimary,
        }}
        ref={titleRef}
        editable={editTitle}
        onChange={(e) => {
          setHeaderTitle(e.target.value);
        }}
        value={headerTitle}
        onBlur={() => {
          if (data.type === 'pack') {
            const packDetails = {
              _id: data._id,
              name: headerTitle,
              is_public: data.is_public,
            };
            setEditTitle(false);
            titleRef.current.style =
              'font-size:20px !important;font-weight:bold;color: #22c67c;';

            dispatch(updatePack(packDetails));
          } else {
            const tripDetails = {
              _id: data._id,
              name: headerTitle,
              is_public: data.is_public,
            };
            setEditTitle(false);
            titleRef.current.style =
              'font-size:20px !important;font-weight:bold;color: #22c67c;';
            editTrips(tripDetails);
            // dispatch(editTrip(tripDetails));
          }
        }}
      />
    </>
  );
};
