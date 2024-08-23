import React from 'react';
import { BaseModal, useModal } from '@packrat/ui';
import { AddPackForm } from '../components';

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
  return (
    <AddPackForm
      isCreatingTrip={isCreatingTrip}
      onSuccess={() => setIsModalOpen(false)}
    />
  );
};
