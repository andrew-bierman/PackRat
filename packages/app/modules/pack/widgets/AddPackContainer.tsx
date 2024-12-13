import React from 'react';
import { BaseModal, RPrimaryButton, useModal } from '@packrat/ui';
import { AddPackForm } from '../components';
import { queryTrpc } from 'app/trpc';
import { Plus } from '@tamagui/lucide-icons';

export const AddPackContainer = ({
  isCreatingTrip,
  onSuccess,
}: {
  isCreatingTrip: boolean;
  onSuccess?: (packId: string) => void;
}) => {
  return (
    <BaseModal
      title="Add Pack"
      triggerComponent={
        <RPrimaryButton size="$1.25" label="Create" icon={<Plus />} />
      }
      footerComponent={undefined}
    >
      <PackModalContent isCreatingTrip={isCreatingTrip} onSuccess={onSuccess} />
    </BaseModal>
  );
};

const PackModalContent = ({
  isCreatingTrip,
  onSuccess,
}: {
  isCreatingTrip?: boolean;
  onSuccess?: (packId: string) => void;
}) => {
  const { setIsModalOpen } = useModal();
  const utils = queryTrpc.useUtils();

  const handleOnSuccess = (packId: string) => {
    utils.getUserPacksFeed.invalidate();
    setIsModalOpen(false);
    onSuccess?.(packId);
  };

  return (
    <AddPackForm isCreatingTrip={isCreatingTrip} onSuccess={handleOnSuccess} />
  );
};
