import React, { useState } from 'react';
import useTheme from 'app/hooks/useTheme';
import { CustomCardHeader } from '../CustomCardHeader';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useAuthUser } from 'app/modules/auth';
import { ActionsDropdownComponent } from '@packrat/ui';
import { EditableText } from '@packrat/ui/src/EditableText';
import RStack from '@packrat/ui/src/RStack';
import RIconButton from '@packrat/ui/src/RIconButton';
import { useFetchSinglePack, useDeletePack } from 'app/modules/pack';
import { usePackActions } from './usePackActions';
import { useRouter } from 'app/hooks/router';
import { Platform, View } from 'react-native';
import { EditPackModal } from 'app/modules/pack/components/EditPackModal';

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
    handleSaveTitle,
    isEditModalOpen,
    setIsEditModalOpen,
    isTitleEditMode,
  } = usePackActions({ data, refetch });

  const { isDark } = useTheme();
  const router = useRouter();

  const optionValues: optionValues[] = [
    { label: 'Edit', value: 'Edit' },
    { label: 'Delete', value: 'Delete' },
  ];

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
              isFocused={isTitleEditMode}
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
              <ActionsDropdownComponent
                value={null}
                data={optionValues}
                onValueChange={(value) => handleActionsOpenChange(value)}
                native={true}
              />
            </View>
          )
        }
      />
      <EditPackModal
        currentPack={data}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        refetch={refetch}
      />
    </>
  );
};
