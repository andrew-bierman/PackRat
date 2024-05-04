import React from 'react';
import { Platform, View } from 'react-native';
import {
  RButton,
  RText,
  RLabel,
  Form,
  FormSelect,
  FormInput,
  SubmitButton,
} from '@packrat/ui';
import { BaseModal } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useAddNewPack } from 'app/hooks/packs';
import { useRouter } from 'app/hooks/router';
import { addPackSchema } from '@packrat/validations';

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
    packSelectOptions,
  } = useAddNewPack();

  // routing
  if (isSuccess && !isCreatingTrip && response) {
    router.push(`/pack/${response.id}`);
  }
  /**
   * Handles the addition of a pack.
   * @return {void}
   */
  const handleAddPack = (data) => {
    addNewPack(data);
  };

  const handleonValueChange = (itemValue) => {
    setIsPublic(itemValue == 'true');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mobileStyle}>
        <Form
          defaultValues={{ isPublic: '0', name: '' }}
          validationSchema={addPackSchema}
        >
          <FormInput
            placeholder="Name"
            name="name"
            label="Name"
            style={{ width: '100%', textAlign: 'left' }}
          />
          <RLabel>Is Public:</RLabel>
          <FormSelect
            onValueChange={handleonValueChange}
            options={packSelectOptions}
            name="isPublic"
            style={{ width: '300px' }}
            width="300px"
            accessibilityLabel="Choose Service"
            placeholder={'Is Public'}
          />
          <SubmitButton
            style={{ width: '300px', marginTop: 40, marginBottom:20 }}
            onSubmit={handleAddPack}
          >
            <RText style={{ color: currentTheme.colors.text }}>
              {isLoading ? 'Loading...' : 'Add Pack'}
            </RText>
          </SubmitButton>
        </Form>

        {isError && <RText>Pack already exists</RText>}
      </View>
    </View>
  );
};

export const AddPackContainer = ({ isCreatingTrip }) => {
  return (
    <BaseModal title="Add Pack" trigger="Add Pack" footerComponent={undefined}>
      <AddPack isCreatingTrip={isCreatingTrip} />
    </BaseModal>
  );
};

const loadStyles = (theme, appTheme) => {
  const { isDark, currentTheme } = theme;
  return {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: 18,
      gap: 20,
      paddingTop: 20,
      backgroundColor: isDark
        ? currentTheme.colors.background
        : currentTheme.colors.white,
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
