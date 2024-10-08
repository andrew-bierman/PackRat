import React from 'react';
import { BaseModal, useModal } from '@packrat/ui';
import { AddPackForm } from '../components';
import { useUserPacks } from 'app/modules/pack';
import { useAuthUser } from 'app/modules/auth';

export const AddPackContainer = ({
  isCreatingTrip,
}: {
  isCreatingTrip: boolean;
}) => {
  return (
    <BaseModal title="Add Pack" trigger="Add Pack" footerComponent={undefined}>
      <PackModalContent isCreatingTrip={isCreatingTrip} />
    </BaseModal>
  );
};

const PackModalContent = ({ isCreatingTrip }: { isCreatingTrip?: boolean }) => {
  const { setIsModalOpen } = useModal();
  const user = useAuthUser();

  const { refetch } = useUserPacks(user?.id);
  const handleOnSuccess = () => {
    refetch();
    setIsModalOpen(false);
  };

  return (
    <AddPackForm isCreatingTrip={isCreatingTrip} onSuccess={handleOnSuccess} />
  );
};
