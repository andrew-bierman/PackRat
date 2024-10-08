import { useDeleteTrips, useEditTrips } from 'app/hooks/trips';
import { useState } from 'react';

export const useTripActions = ({ data, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTitleEditMode, setIsTitleEditMode] = useState(false);
  const { editTrips } = useEditTrips();
  const { handleDeleteTrip } = useDeleteTrips(data.id);

  const handleActionsOpenChange = (state) => {
    switch (state) {
      case 'Edit':
        setIsEditModalOpen(true);
        break;
      case 'Delete':
        handleDeleteTrip();
        break;
    }
  };

  const handleSaveTitle = (title) => {
    const TripDetails = {
      id: data.id,
      name: title,
    };
    editTrips(TripDetails, {
      onSuccess: () => {
        refetch?.();
      },
    });
    setIsTitleEditMode(false);
  };

  return {
    handleActionsOpenChange,
    isTitleEditMode,
    isEditModalOpen,
    setIsEditModalOpen,
    handleSaveTitle,
  };
};
