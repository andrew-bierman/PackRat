import React from 'react';
import useTheme from 'app/hooks/useTheme';
import { CustomCardHeader } from '../CustomCardHeader';
import { AntDesign } from '@expo/vector-icons';
import { useAuthUser } from 'app/auth/hooks';
import {
  ThreeDotsMenu,
  YStack,
  RButton,
  EditableText,
  RIconButton,
  RStack,
} from '@packrat/ui';
import { useDeletePack, useFetchSinglePack } from 'app/hooks/packs';
import { usePackTitleInput } from './usePackTitleInput';
import { useRouter } from 'app/hooks/router';

interface PackCardHeaderProps {
  data: any;
  title: string;
  link: string;
}

export const PackCardHeader = ({ data, title, link }: PackCardHeaderProps) => {
  const { isLoading } = useFetchSinglePack(data?.id);
  const user = useAuthUser();
  const handleDeletePack = useDeletePack(data.id);
  const { handleActionsOpenChange, handleEdit, handleSaveTitle, isEditMode } =
    usePackTitleInput(data);

  const { currentTheme } = useTheme();
  const router = useRouter();
  return (
    <CustomCardHeader
      data={data}
      title={
        <RStack
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <RIconButton
            backgroundColor="transparent"
            icon={
              <AntDesign
                name="arrowleft"
                size={24}
                color={currentTheme.colors.black}
              />
            }
            onPress={()=>{
              router.back();
              }}
          />
          <EditableText
            isLoading={isLoading}
            defaultValue={title}
            isFocused={isEditMode}
            onSave={handleSaveTitle}
          />
        </RStack>
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
