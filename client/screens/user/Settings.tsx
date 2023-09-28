import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import {
  Input,
  Separator,
  Text,
  Stack,
  Select,
  Label,
  Button,
  XStack,
  YStack,
  H5,
  H2,
} from 'tamagui';
import Avatar from '~/components/Avatar';
import { editUser, updatePassword } from '../../store/authStore';
import { InformUser } from '~/utils/ToastUtils';
import useTheme from '~/hooks/useTheme';
import {
  editUser as editUserValidations,
  updatePassword as updatePasswordValidations,
} from '@packrat/packages';
import ReusableForm from '../../packrat-ui/form';

export default function Settings() {
  const [user, setUser] = useState(
    useSelector((state: any) => state.auth.user),
  );
  const dispatch = useDispatch();
  const { currentTheme } = useTheme();
  const [passwords, setPasswords] = useState<any>({});
  const [formErrors, setFormErrors] = useState({});

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

  const handleEditUser = (data) => {
    const {
      userId,
      email,
      name,
      username,
      profileImage,
      preferredWeather,
      preferredWeight,
    } = data;
    try {
      dispatch(
        editUser({
          userId,
          email,
          name,
          username,
          profileImage,
          preferredWeather,
          preferredWeight,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePassword = (data) => {
    const { password, oldPassword, confirmPassword, email } = data;
    if (password !== confirmPassword) return;
    try {
      dispatch(updatePassword({ email, password }));
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

  return (
    <YStack
      space="$3"
      width="fit-content"
      paddingVertical={20}
      marginHorizontal="auto"
    >
      <Stack>
        <H2>Profile</H2>
        <Separator marginVertical={8} />
      </Stack>
      <XStack alignItems="center" space>
        <Avatar size={90} src={user.profileImage} />
        <YStack space="$2">
          <H5 fontWeight="medium">Profile Picture</H5>
          <XStack space="$2" alignItems="flex-end">
            <Button
              size="$3"
              icon={<Ionicons name="cloud-upload-outline" size={24} />}
              color="white"
              style={{ backgroundColor: '#0284c7' }}
              onPress={pickImage}
            >
              Upload
            </Button>
            <Button size="$3" onPress={removeProfileImage}>
              Remove
            </Button>
          </XStack>
        </YStack>
      </XStack>
      <ReusableForm
        fields={[
          { name: 'name', label: 'Name', type: 'text' },
          {
            name: 'username',
            label: 'Username',
            type: 'text',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
          },
          {
            name: 'preferredWeather',
            label: 'Weather',
            inputComponent: 'select',
            items: ['celsius', 'fahrenheit'],
          },
          {
            name: 'preferredWeight',
            label: 'Weight',
            inputComponent: 'select',
            items: ['lb', 'oz', 'kg', 'g'],
          },
        ]}
        defaultValues={{ ...user, userId: user._id }}
        schema={editUserValidations}
        submitText="Update profile"
        onSubmit={handleEditUser}
      />
      <Stack marginTop={20} marginBottom={10}>
        <H2>Change Password</H2>
        <Separator marginVertical={8} />
        <Text fontSize={16}>We will email you to verify the change.</Text>
      </Stack>
      <ReusableForm
        fields={[
          { name: 'oldPassword', label: 'Old password', type: 'password' },
          { name: 'password', label: 'New password', type: 'password' },
          {
            name: 'confirmPassword',
            label: 'Confirm new password',
            type: 'password',
          },
        ]}
        defaultValues={{
          password: '',
          oldPassword: '',
          confirmPassword: '',
          email: user.email,
        }}
        schema={updatePasswordValidations}
        submitText="Change password"
        onSubmit={handleUpdatePassword}
      />
    </YStack>
  );
}
