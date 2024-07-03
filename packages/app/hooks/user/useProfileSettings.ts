import { useState } from 'react';
import { useUpdateUser } from './useUpdateUser';
import { useAuthUser, useUserQuery } from '../../auth/hooks';
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
  const { user, refetch } = useUserQuery();
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
    if (!user) return;
    const { id } = user;

    updateUser({
      userId: id,
      ...data,
    }).then(() => refetch());
  };

  const handleUpdatePassword = (data) => {
    if (!user) return;
    const { email } = user;
    const { oldPassword, newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) return;
    updateUserPassword({ email, oldPassword, password: newPassword } as any);
  };

  return {
    user,
    passwords,
    handlePasswordsChange,
    handleEditUser,
    handleUpdatePassword,
  };
};
