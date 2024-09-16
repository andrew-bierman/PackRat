import React, { useEffect, useState } from 'react';
import { BaseModal } from '../../../../ui/src/modal/BaseModal';
import RButton from '@packrat/ui/src/RButton';
import RInput from '@packrat/ui/src/RInput';
import RStack from '@packrat/ui/src/RStack';
import RText from '@packrat/ui/src/RText';
import { Switch } from 'tamagui';
import { useEditTrips } from 'app/hooks/trips/useEditTrips';

interface EditTripModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  currentTrip: any;
  refetch?: () => void;
}

export const EditTripModal: React.FC<EditTripModalProps> = ({
  isOpen,
  onClose,
  currentTrip,
  refetch,
}) => {
  const [tripName, setTripName] = useState(currentTrip?.name ?? '');
  const { editTrips, isLoading, isError } = useEditTrips();

  const handleEditTrip = async () => {
    try {
      editTrips(
        { id: currentTrip.id, name: tripName },
        {
          onSuccess: () => {
            onClose?.();
            refetch?.();
          },
        },
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTripName(currentTrip?.name ?? '');
    }
  }, [isOpen]);

  return (
    <BaseModal
      showTrigger={false}
      title="Edit Trip"
      footerButtons={[
        {
          label: 'Cancel',
          color: '#B22222',
          onClick: (_, closeModal) => {
            closeModal();
            onClose?.();
          },
        },
      ]}
      isOpen={isOpen}
      onClose={onClose}
    >
      <RInput
        placeholder="Trip Name"
        value={tripName}
        onChangeText={(t) => setTripName(t)}
        style={{ width: 200 }}
      />
      <RButton onPress={handleEditTrip} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </RButton>
      {isError && (
        <RStack>
          <RText style={{ color: 'red' }}>Failed to save changes</RText>
        </RStack>
      )}
    </BaseModal>
  );
};
