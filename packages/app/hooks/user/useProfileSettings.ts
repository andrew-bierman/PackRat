import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { editUser, updatePassword } from '../../store/authStore';
import { useAuthUser } from './useAuthUser';

const PROFILE_SETTINGS_DEFAULTS = {
  profileImage: '',
  name: '',
  username: '',
  email: '',
  preferredWeather: null,
  preferredWeight: '',
};

export const useProfileSettings = () => {
  const authUser = useAuthUser();
  const [user, setUser] = useState(authUser);
  const isReady = useRef(false);
  const dispatch = useDispatch();

  const [passwords, setPasswords] = useState<any>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = ({ target }) => {
    setUser((prev) => ({ ...prev, [target.id]: target.value }));
  };

  const handlePasswordsChange = ({ target }) => {
    setPasswords((prev) => ({ ...prev, [target.id]: target.value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange({ target: { id: 'profileImage', value: result.uri } });
    }
  };

  const removeProfileImage = () => {
    handleChange({ target: { id: 'profileImage', value: null } });
  };

  const handleEditUser = () => {
    const {
      _id,
      email,
      name,
      username,
      profileImage,
      preferredWeather,
      preferredWeight,
    } = user;

    dispatch(
      editUser({
        userId: _id,
        email,
        name,
        username,
        profileImage,
        preferredWeather,
        preferredWeight,
      }),
    );
  };

  const handleUpdatePassword = () => {
    const { email } = user;
    const { oldPassword, newPassword, confirmPassword } = passwords;
    if (newPassword !== confirmPassword) return;
    dispatch(updatePassword({ email, oldPassword, newPassword }));
  };

  useEffect(() => {
    if (!isReady.current && authUser) {
      setUser(authUser);
      isReady.current = true;
    }
  }, [isReady, authUser]);

  return {
    user,
    passwords,
    handleChange,
    pickImage,
    handlePasswordsChange,
    removeProfileImage,
    handleEditUser,
    handleUpdatePassword,
  };
};
