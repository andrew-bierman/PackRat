import { Platform, View } from 'react-native';
import DropdownComponent from '../Dropdown';
import { RInput, RButton, RText, RLabel } from '@packrat/ui';
import { BaseModal } from '@packrat/ui';
import { addPack } from '../../store/packsStore';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useAddNewPack } from 'app/hooks/packs';
import { useRouter } from 'app/hooks/router';
import { packSelectOptions } from 'app/constants/options';

export const AddPack = ({ isCreatingTrip = false }) => {
  // Hooks
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
    isPublic,
    setName,
  } = useAddNewPack();

  // routing
  if (isSuccess && !isCreatingTrip && response) {
    router.push(`/pack/${response.createdPack._id}`);
  }
  /**
   * Handles the addition of a pack.
   * @return {void}
   */
  console.log({ user });
  const handleAddPack = () => {
    addNewPack();
  };

  const handleonValueChange = (itemValue) => {
    if (itemValue === 'Yes') setIsPublic(true);
    else setIsPublic(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mobileStyle}>
        <RInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          width={Platform.OS === 'web' ? '25%' : '100%'}
        />
        <RLabel>Is Public:</RLabel>
        <DropdownComponent
          value={isPublic}
          onValueChange={handleonValueChange}
          data={packSelectOptions}
          width="300px"
          accessibilityLabel="Choose Service"
          placeholder={'Is Public'}
        />
        <RButton
          width={Platform.OS === 'web' ? null : '50%'}
          onPress={() => {
            handleAddPack();
          }}
        >
          <RText style={{ color: currentTheme.colors.text }}>
            {isLoading ? 'Loading...' : 'Add Pack'}
          </RText>
        </RButton>

        {isError && <RText>Pack already exists</RText>}
      </View>
    </View>
  );
};

export const AddPackContainer = ({ isCreatingTrip }) => {
  return (
    <BaseModal title="Add Pack" trigger="Add Pack">
      <AddPack isCreatingTrip={isCreatingTrip} />
    </BaseModal>
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
