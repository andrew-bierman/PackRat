import { useRouter } from 'expo-router';
import { Box, Button, CheckIcon, Input, Select, Text } from 'native-base';
import { useState } from 'react';
import { Platform } from 'react-native';
import { packSelectOptions } from '~/constants/options';
import { useAddNewPack } from '~/hooks/packs';
import useCustomStyles from '~/hooks/useCustomStyles';
import useTheme from '../../hooks/useTheme';
import { CustomModal } from '../modal';

export const AddPack = ({ isCreatingTrip = false }) => {
  //Hooks
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const router = useRouter();

  const {
    addNewPack,
    isSuccess,
    isError,
    response,
    error,
    isLoading,
    name,
    setIsPublic,
    setName,
  } = useAddNewPack();

  //routing
  if (isSuccess && !isCreatingTrip && response) {
    router.push(`/pack/${response.createdPack._id}`);
  }
  /**
   * Handles the addition of a pack.
   * @return {void}
   */
  const handleAddPack = () => {
    addNewPack();
  };

  const handleonValueChange = (itemValue) => {
    if (itemValue === 'Yes') setIsPublic(true);
    else setIsPublic(false);
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.mobileStyle}>
        <Input
          size="lg"
          variant="outline"
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          width={Platform.OS === 'web' ? '25%' : '100%'}
        />
        <Select
          width="100%"
          accessibilityLabel="Choose Service"
          placeholder={'Is Public'}
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          onValueChange={handleonValueChange}
        >
          {packSelectOptions.map((val, index) => {
            return (
              <Select.Item
                key={index}
                label={String(val.label)}
                value={val.value}
              />
            );
          })}
        </Select>

        <Button
          width={Platform.OS === 'web' ? null : '50%'}
          onPress={() => {
            handleAddPack();
          }}
        >
          <Text style={{ color: currentTheme.colors.text }}>
            {isLoading ? 'Loading...' : 'Add Pack'}
          </Text>
        </Button>

        {isError && <Text>{error.message}</Text>}
      </Box>
    </Box>
  );
};

export const AddPackContainer = ({ isCreatingTrip }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CustomModal
      title="Add Pack"
      trigger="Add Pack"
      isActive={isOpen}
      onTrigger={setIsOpen}
    >
      <AddPack isCreatingTrip={isCreatingTrip} />
    </CustomModal>
  );
};

const loadStyles = (theme, appTheme) => {
  const { currentTheme } = theme;
  return {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: 18,
      gap: 20,
      marginTop: 20,
    },
    desktopStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 25,
      gap: 5,
      flex: 1,
    },

    mobileStyle: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 25,
      gap: 25,
    },

    input: {
      backgroundColor: currentTheme.colors.white,
      paddingLeft: 15,
      paddingRight: 15,
      borderColor: 'grey',
      borderWidth: 1,
      flex: 1,
      width: '100%',
      paddingVertical: 12,
    },
    btn: {
      backgroundColor: currentTheme.colors.cardIconColor,
      paddingHorizontal: 25,
      paddingVertical: 15,
      textAlign: 'center',
      alignItems: 'center',
      color: appTheme.colors.text,
      width: '50%',
    },
  };
};
