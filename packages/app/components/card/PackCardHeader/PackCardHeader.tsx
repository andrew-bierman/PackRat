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
import { useEditPack } from 'app/hooks/packs/useEditPack';
import { Platform } from 'react-native';

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

  const { isDark, currentTheme } = useTheme();
  const router = useRouter();
  const { editPack } = useEditPack();

  const handleSavePack = () => {
    const packDetails = {
      id: data.id,
      name: data.name,
      is_public: data.is_public,
    };
    editPack(packDetails);
  };
  return (
    <CustomCardHeader
      data={data}
      title={
        <RStack
          style={{
            display:'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          {Platform.OS === 'web' && (
            <RIconButton
              backgroundColor="transparent"
              icon={
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color={isDark ? 'white' : 'black'}
                />
              }
              onPress={() => {
                if (Platform.OS === 'web') {
                  window?.history?.back();
                } else {
                  router.back();
                }
              }}
            />
          )}
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
              <RButton onPress={handleSavePack}>Save</RButton>
              <RButton onPress={handleDeletePack}>Delete</RButton>
            </YStack>
          </ThreeDotsMenu>
        )
      }
    />
  );
};
