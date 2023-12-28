import { Platform, View } from 'react-native';
import DropdownComponent from '../Dropdown';
import { RInput, RButton, RText, RLabel } from '@packrat/ui';
import { addPack } from '../../store/packsStore';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CustomModal } from '../modal';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from '~/hooks/useCustomStyles';
// import useAddPack from "../../hooks/useAddPack";
// import { useAuth } from "../../auth/provider";

export const AddPack = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);

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
  const handleAddPack = () => {
    dispatch(addPack({ name, owner_id: user?._id, is_public: isPublic }));
    setName('');
  };

  const data = ['Yes', 'For me only'];

  const handleonValueChange = (itemValue) => {
    setIsPublic(itemValue == 'Yes');
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
          data={data}
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
