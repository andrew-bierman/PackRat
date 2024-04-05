import { useEffect, useRef, useState } from 'react';
import { useUpdateUser } from './useUpdateUser';
import * as ImagePicker from 'expo-image-picker';
import { useAuthUser } from '../../auth/hooks';
import { useUpdateUserPassword } from './useUpdateUserPassword';

const PROFILE_SETTINGS_DEFAULTS = {
  profileImage: '',
  name: '',
  username: '',
  email: '',
  preferredWeather: null,
  preferredWeight: '',
};

export const useProfileSettings = () => {
  const user = useAuthUser();
  const updateUser = useUpdateUser();
  const updateUserPassword = useUpdateUserPassword();
  const [passwords, setPasswords] = useState<any>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordsChange = ({ target }) => {
    setPasswords((prev) => ({ ...prev, [target.id]: target.value }));
  };

  const handleEditUser = (data) => {
    const { _id } = user;

    console.log({ data });

    updateUser({
      userId: _id,
      ...data,
    });
  };

  const handleUpdatePassword = (data) => {
    const { email } = user;
    const { oldPassword, newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) return;
    updateUserPassword({ email, oldPassword, password: newPassword });
  };

  return {
    user,
    passwords,
    handlePasswordsChange,
    handleEditUser,
    handleUpdatePassword,
  };
};
