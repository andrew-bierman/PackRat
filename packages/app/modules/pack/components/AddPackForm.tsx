import React from 'react';
import {
  Form,
  FormInput,
  RStack,
  RSwitch,
  RText,
  XStack,
  SubmitButton,
} from '@packrat/ui';
import { addPackSchema } from '@packrat/validations';
import { useAddNewPack } from '../hooks';
import { useRouter } from 'app/hooks/router';
import useCustomStyles from 'app/hooks/useCustomStyles';
import useResponsive from 'app/hooks/useResponsive';
import { Platform, View } from 'react-native';
import { Switch } from 'tamagui';
import useTheme from '../../../hooks/useTheme';
import { Users } from '@tamagui/lucide-icons';

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

      if (!response?.id) {
        return;
      }
      onSuccess?.(response.id);

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
            containerProps={{ style: { width: '100%' } }}
            helperTextProps={{ fontSize: 14, lineHeight: 20 }}
            helperText='Choose a descriptive name, e.g., "Summer Beach Trip" or "Business Conference".'
            placeholder="Add pack name"
            name="name"
            label="Pack name"
          />
          <View style={{ width: '100%' }}>
            <RStack
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: 'ActiveBorder',
                borderWidth: 1,
                alignItems: 'center',
                borderRadius: 8,
                padding: 12,
              }}
            >
              <XStack gap={10}>
                <Users />
                <RText style={{ fontSize: 16, fontWeight: 600 }}>
                  Make This Pack Public{' '}
                </RText>
              </XStack>
              <RSwitch
                checked={isPublic}
                onCheckedChange={handleOnValueChange}
                size="$2"
                style={{ backgroundColor: '#e4e4e7' }}
              >
                <Switch.Thumb unstyled style={{ backgroundColor: '#fff' }} />
              </RSwitch>
            </RStack>
            <RText style={{ fontSize: 14, marginTop: 8, lineHeight: 20 }}>
              Public packs can be viewed and copied by other users. Private
              packs are visible only to you.
            </RText>
          </View>
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
      width: Platform.OS === 'web' ? '100%' : 'undefined',
      gap: 20,
      maxWidth: 440,
    },
    desktopStyle: {
      flex: 1,
      flexDirection: 'row',
      gap: 5,
    },

    mobileStyle: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24,
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
      backgroundColor: '#000000',
      width: '100%',
    },
  };
};
