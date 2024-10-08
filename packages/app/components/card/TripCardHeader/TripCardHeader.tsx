import React from 'react';
import { Platform, Text, View } from 'react-native';
import { useRouter } from 'app/hooks/router';
import useTheme from 'app/hooks/useTheme';
import { CustomCardHeader } from '../CustomCardHeader';
import RStack from '@packrat/ui/src/RStack';
import RIconButton from '@packrat/ui/src/RIconButton';
import { AntDesign } from '@expo/vector-icons';
import { ActionsDropdownComponent } from '@packrat/ui/src/CascadedDropdown';
import { useFetchSingleTrip } from 'app/hooks/singletrips/useFetchSingleTrip';
import { useTripActions } from './useTripActions';
import { useAuthUser } from 'app/modules/auth';
import { EditTripModal } from 'app/modules/trip/components/EditTripModal';

interface TripCardHeaderProps {
  data: any;
  title: string;
  link?: string;
}
interface optionValues {
  label: string;
  value: string;
}

export const TripCardHeader = ({ data, title }: TripCardHeaderProps) => {
  const { refetch } = useFetchSingleTrip(data?.id);
  const user = useAuthUser();

  const { currentTheme } = useTheme();
  const router = useRouter();
  const {
    handleActionsOpenChange,
    handleSaveTitle,
    isEditModalOpen,
    setIsEditModalOpen,
  } = useTripActions({ data, refetch });

  const optionValues: optionValues[] = [
    { label: 'Edit', value: 'Edit' },
    { label: 'Delete', value: 'Delete' },
  ];

  return (
    <>
      <CustomCardHeader
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
                    color={currentTheme.colors.text}
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
            <Text style={{ color: currentTheme.colors.text }}>{title}</Text>
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
      <EditTripModal
        currentTrip={data}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        refetch={refetch}
      />
    </>
  );
};
