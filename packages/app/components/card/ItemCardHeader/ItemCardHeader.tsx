import React, { useState } from 'react';
import useTheme from 'app/hooks/useTheme';
import { CustomCardHeader } from '../CustomCardHeader';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useAuthUser } from 'app/modules/auth';
import { RStack, RIconButton, DropdownComponent, RText } from '@packrat/ui';
import { useFetchSinglePack, useDeletePack } from 'app/hooks/packs';
import { useItemTitleInput } from './useItemTitleInput';
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

export const ItemCardHeader = ({ data, title }: PackCardHeaderProps) => {
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
  } = useItemTitleInput(data);

  const { isDark } = useTheme();
  const router = useRouter();

  const optionValues: optionValues[] = [
    { label: 'Edit', value: 'Edit' },
    { label: 'Delete', value: 'Delete' },
  ];

  const { xxs, xs, xxl } = useResponsive();
  console.log({ data });

  return (
    <>
      <CustomCardHeader
        link={''}
        data={data}
        ownerId={data?.ownerId}
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
            <RText>{title}</RText>
          </RStack>
        }
      />
    </>
  );
};
