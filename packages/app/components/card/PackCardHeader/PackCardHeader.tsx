import React from 'react';
import { useSelector } from 'react-redux';

import { CustomCardHeader } from '../CustomCardHeader';
import { useAuthUser } from 'app/hooks/user/useAuthUser';
import { ThreeDotsMenu, YStack, Button, EditableText } from '@packrat/ui';
import { useDeletePack } from 'app/hooks/packs';
import { usePackTitleInput } from './usePackTitleInput';

interface PackCardHeaderProps {
  data: any;
  title: string;
  link: string;
}

export const PackCardHeader = ({ data, title, link }: PackCardHeaderProps) => {
  const user = useAuthUser();
  const isLoading = useSelector((state: any) => state.singlePack.isLoading);
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
              <Button onPress={handleEdit}>Edit</Button>
              <Button onPress={handleDeletePack}>Delete</Button>
            </YStack>
          </ThreeDotsMenu>
        )
      }
    />
  );
};
