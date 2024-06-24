import React, { useState } from 'react';
import useTheme from 'app/hooks/useTheme';
import { CustomCardHeader } from '../CustomCardHeader';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useAuthUser } from 'app/auth/hooks';
import {
  RStack,
  RIconButton,
  EditableText,
  
} from '@packrat/ui';
import { useFetchSinglePack, useDeletePack } from 'app/hooks/packs';
import { usePackTitleInput } from './usePackTitleInput';
import { useRouter } from 'app/hooks/router';
import { Platform, View } from 'react-native';
import DropdownComponent from 'app/components/Dropdown';

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

  const optionValues = [
    { label: 'Edit', value: 'Edit' },
    { label: 'Save', value: 'Save' },
    { label: 'Delete', value: 'Delete' },
  ];

  return (
    <>
      <CustomCardHeader
        link={''}
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
          user?.id === data.owner_id &&
          <View style={{ alignSelf: 'flex-end', flexDirection: 'row', width: '15%', justifyContent: 'flex-end' }}>
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
        }
      />
    </>
  );
};
