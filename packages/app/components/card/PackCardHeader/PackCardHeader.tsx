import React, { useState } from 'react';
import useTheme from 'app/hooks/useTheme';
import { CustomCardHeader } from '../CustomCardHeader';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useAuthUser } from 'app/modules/auth';
import {
  RStack,
  RIconButton,
  EditableText,
  DropdownComponent,
} from '@packrat/ui';
import { useFetchSinglePack, useDeletePack } from 'app/modules/pack';
import { usePackTitleInput } from './usePackTitleInput';
import { useRouter } from 'app/hooks/router';
import { Platform, View } from 'react-native';
import useResponsive from 'app/hooks/useResponsive';

interface PackCardHeaderProps {
  data: any;
  title: string;
  link?: string;
}
interface optionValues {
  label: string;
  value: string;
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

  const optionValues: optionValues[] = [
    { label: 'Edit', value: 'Edit' },
    { label: 'Save', value: 'Save' },
    { label: 'Delete', value: 'Delete' },
  ];

  const { xxs, xs, xxl } = useResponsive();

  return (
    <>
      <CustomCardHeader
        link={''}
        data={data}
        ownerId={data?.owner_id}
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
                minWidth: 50,
                maxWidth: 100,
              }}
            >
              <DropdownComponent
                value={null}
                data={optionValues}
                onValueChange={(value) => handleActionsOpenChange(value)}
                placeholder={
                  <RIconButton
                    backgroundColor="transparent"
                    icon={<MaterialIcons name="more-horiz" size={20} />}
                    style={{ paddingTop: 20 }}
                  />
                }
                native={true}
              />
            </View>
          )
        }
      />
    </>
  );
};
