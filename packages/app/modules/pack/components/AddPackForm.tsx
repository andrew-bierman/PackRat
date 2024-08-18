import React from 'react';
import {
  Form,
  FormInput,
  RStack,
  RSwitch,
  RText,
  SubmitButton,
} from '@packrat/ui';
import { addPackSchema } from '@packrat/validations';
import { useAddNewPack } from '../hooks';
import { useRouter } from 'app/hooks/router';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useResponsive from 'app/hooks/useResponsive';
import { View } from 'react-native';
import { Switch } from 'tamagui';
import useTheme from '../../../hooks/useTheme';

export const AddPackForm = ({
  isCreatingTrip = false,
  onSuccess = () => {},
}: {
  isCreatingTrip?: boolean;
  onSuccess?: any;
}) => {
  // Hooks
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const router = useRouter();
  const { xxs, xxl, xs } = useResponsive();

  const {
    addNewPackAsync,
    isError,
    isLoading,
    isPublic,
    setIsPublic,
    packSelectOptions,
  } = useAddNewPack();

  /**
   * Handles the addition of a pack.
   * @return {void}
   */
  const handleAddPack = async (data) => {
    try {
      const response = await addNewPackAsync({ ...data, isPublic });

      onSuccess?.();

      if (!response?.id) {
        return;
      }
      if (!isCreatingTrip) {
        router.push(`/pack/${response.id}`);
      }
    } catch {}
  };

  const handleOnValueChange = () => {
    setIsPublic((prevIsPublic) => {
      const newIsPublic = !prevIsPublic;
      console.log('isPublic:', newIsPublic);
      return newIsPublic;
    });
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
            style={{
              textAlign: 'left',
              width: 200,
              alignItems: 'inherit',
              justifyContent: 'center',
            }}
          />
          <RStack
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <RText>Public </RText>
            <RSwitch
              checked={isPublic}
              onCheckedChange={handleOnValueChange}
              size="$1.5"
            >
              <Switch.Thumb />
            </RSwitch>
          </RStack>
          <SubmitButton style={styles.btn} onSubmit={handleAddPack}>
            <RText style={{ color: currentTheme.colors.white }}>
              {isLoading ? 'Loading...' : 'Add Pack'}
            </RText>
          </SubmitButton>
        </Form>

        {isError && <RText>Pack already exists</RText>}
      </View>
    </View>
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
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 25,
      gap: 5,
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
      width: '200px',
      marginTop: 40,
      marginBottom: 20,
    },
  };
};
