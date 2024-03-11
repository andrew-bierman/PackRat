import React from 'react';

import { CustomCardHeader } from '../CustomCardHeader';
import { useAuthUser } from 'app/auth/hooks';
import { ThreeDotsMenu, YStack, RButton, EditableText } from '@packrat/ui';
import { useDeletePack, useFetchSinglePack } from 'app/hooks/packs';
import { usePackTitleInput } from './usePackTitleInput';

interface PackCardHeaderProps {
  data: any;
  title: string;
  link: string;
}

export const PackCardHeader = ({ data, title, link }: PackCardHeaderProps) => {
  const { isLoading } = useFetchSinglePack(data?._id);
  const user = useAuthUser();
  const handleDeletePack = useDeletePack(data._id);
  const { handleActionsOpenChange, handleEdit, handleSaveTitle, isEditMode } =
    usePackTitleInput(data);

  return (
    <CustomCardHeader
      data={data}
      title={
        <EditableText
          isLoading={isLoading}
          defaultValue={title}
          isFocused={isEditMode}
          onSave={handleSaveTitle}
        />
      }
      link={link}
      actionsComponent={
        user?.id === data.owner_id && (
          <ThreeDotsMenu onOpenChange={handleActionsOpenChange}>
            <YStack space="$1">
              <RButton onPress={handleEdit}>Edit</RButton>
              <RButton onPress={handleDeletePack}>Delete</RButton>
            </YStack>
          </ThreeDotsMenu>
        )
      }
    />
  );
};
