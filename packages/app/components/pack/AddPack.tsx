import React from 'react';
import { Platform, View } from 'react-native';
import {
  RText,
  Form,
  FormSelect as OriginalFormSelect,
  FormInput,
  SubmitButton,
  useModal,
} from '@packrat/ui';
import { BaseModal } from '@packrat/ui';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useAddNewPack, usePackId } from 'app/hooks/packs';
import { useRouter } from 'app/hooks/router';
import { addPackSchema } from '@packrat/validations';
import { RContextMenu } from '@packrat/ui/src/RContextMenu';

interface MenuItems {
  label: string;
  onSelect: () => void;
}

const FormSelect: any = OriginalFormSelect;

export const AddPack : React.FC<AddPackProps> = ({ isCreatingTrip = false, onSuccess }) => {
  // Hooks
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const router = useRouter();
  // const [_, setPackIdParam] = usePackId();

  const {
    addNewPackAsync,
    isError,
    isLoading,
    setIsPublic,
    packSelectOptions,
  } = useAddNewPack();

  /**
   * Handles the addition of a pack.
   * @return {void}
   */
  const handleAddPack = async (data) => {
    try {
      const response = await addNewPackAsync(data);

      onSuccess?.();

      if (!response?.id) {
        return;
      }
      if (!isCreatingTrip) {
        router.push(`/pack/${response.id}`);
        return;
      }

      // setPackIdParam(response.id);
    } catch {}
  };

  const handleonValueChange = (itemValue) => {
    setIsPublic(itemValue == 'true');
  };

  const menuItems: MenuItems[] = [
    { label: 'Yes', onSelect: () => setIsPublic(true) },
    { label: 'No', onSelect: () => setIsPublic(false) },
  ];

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
            style={{ textAlign: 'left', width: 200 }}
          />
          {Platform.OS === 'web' ? (
            <FormSelect
              onValueChange={handleonValueChange}
              options={packSelectOptions}
              name="isPublic"
              label="Is Public"
              accessibilityLabel="Choose Service"
              placeholder={'Is Public'}
            />
          ) : (
            <RContextMenu menuItems={menuItems} menuName="Is Public" />
          )}

          <SubmitButton style={styles.btn} onSubmit={handleAddPack}>
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
      <PackModalContent isCreatingTrip={isCreatingTrip} />
    </BaseModal>
  );
};

const PackModalContent = ({ isCreatingTrip }: { isCreatingTrip?: boolean }) => {
  const { setIsModalOpen } = useModal();
  return (
    <AddPack
      isCreatingTrip={isCreatingTrip}
      onSuccess={() => setIsModalOpen(false)}
    />
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
