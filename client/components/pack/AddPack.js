import { Platform } from 'react-native';
import { Box, Input, Button, Text, Select, CheckIcon } from 'native-base';

// import useAddPack from "../../hooks/useAddPack";
import { addPack } from '../../store/packsStore';
import { useState } from 'react';
// import { useAuth } from "../../auth/provider";
import { useSelector, useDispatch } from 'react-redux';
import { CustomModal } from '../modal';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
import { addPack as addPackValidation } from '@packrat/packages';
import { InformUser } from '~/utils/ToastUtils';
import { ReusableForm } from '../../packrat-ui';

export const AddPack = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  // const { addPack } = useAddPack();
  // const { user } = useAuth();
  const user = useSelector((state) => state.auth.user);

  const isLoading = useSelector((state) => state.packs.isLoading);

  const error = useSelector((state) => state.packs.error);

  const isError = error !== null;

  /**
   * Handles the addition of a pack.
   *
   * @param {string} name - The name of the pack.
   * @param {string} owner_id - The ID of the pack's owner.
   * @return {void}
   */
  const handleAddPack = (data) => {
    try {
      dispatch(addPack(data));
      setName('');
    } catch (error) {
      console.log(error);
    }
  };

  if (formErrors) {
    Object.entries(formErrors).map(([key, error]) => {
      InformUser({
        title: key + ' ' + error,
        duration: 3000,
        placement: 'top-right',
        style: { backgroundColor: currentTheme.colors.error },
      });
    });
  }

  const data = ['Yes', 'For me only'];

  const handleonValueChange = (itemValue) => {
    setIsPublic(itemValue == 'Yes');
  };

  return (
    <Box style={styles.container}>
      <ReusableForm
        fields={[
          { name: 'name', label: 'Name', type: 'text' },
          {
            name: 'is_public',
            label: 'Public',
            inputComponent: 'select',
            items: data,
            booleanStrings: true,
          },
        ]}
        defaultValues={{ owner_id: user?._id, is_public: true }}
        schema={addPackValidation}
        submitText={isLoading ? 'Loading...' : 'Add Pack'}
        onSubmit={handleAddPack}
      />

      {isError && <Text>Pack already exists</Text>}
    </Box>
  );
};

export const AddPackContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CustomModal
      title="Add Pack"
      trigger="Add Pack"
      isActive={isOpen}
      onTrigger={setIsOpen}
    >
      <AddPack />
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
