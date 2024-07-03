import React, { useState } from 'react';
import useTheme from 'app/hooks/useTheme';
import { CustomCardHeader } from '../CustomCardHeader';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useAuthUser } from 'app/auth/hooks';
import {
  RStack,
  RIconButton,
  EditableText,
  DropdownComponent,
} from '@packrat/ui';
import { useFetchSinglePack, useDeletePack } from 'app/hooks/packs';
import { usePackTitleInput } from './usePackTitleInput';
import { useRouter } from 'app/hooks/router';
import { useEditPack } from 'app/hooks/packs/useEditPack';
import { Dimensions, Platform } from 'react-native';
import { CopyPackModal } from '../../pack/CopyPackModal';
import { View } from 'react-native';

interface MenuItems {
  label: string;
  onSelect: () => void;
}
interface PackCardHeaderProps {
  data: any;
  title: string;
  link?: string;
}

export const PackCardHeader = ({ data, title }: PackCardHeaderProps) => {
  const { isLoading, refetch } = useFetchSinglePack(data?.id);
  const user = useAuthUser();
  const { handleDeletePack } = useDeletePack(data.id);
  const {
    handleActionsOpenChange,
    handleEdit,
    handleSaveTitle,
    isEditMode,
    isOpen,
    setIsOpen,
  } = usePackTitleInput(data);

  const { isDark } = useTheme();
  const router = useRouter();

  const handleDelete = () => {
    handleDeletePack();
    setIsOpen(false);
  };
  const handleSavePack = () => {
    const packDetails = {
      id: data.id,
      name: data.name,
      is_public: data.is_public,
    };
    setIsOpen(false);
    editPack(packDetails);
  };

  const menuItems: MenuItems[] = [
    { label: 'Edit', onSelect: handleEdit },
    { label: 'Save', onSelect: handleSavePack },
    { label: 'Delete', onSelect: handleDelete },
  ];

  return (
    <>
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
        actionsComponent={
          user?.id === data.owner_id && (
            <View
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row',
                width: '15%',
                justifyContent: 'flex-end',
              }}
            >
              <DropdownComponent
                value={null}
                data={optionValues}
                onValueChange={(value) => handleActionsOpenChange(value)}
                placeholder={
                  <RIconButton
                    backgroundColor="transparent"
                    icon={<MaterialIcons name="more-horiz" size={18} />}
                    style={{ padding: 0 }}
                  />
                }
                width="100%"
                native={true}
                zeego={true}
              />
            </View>
          )
        }
      />
    </>
  );
};
