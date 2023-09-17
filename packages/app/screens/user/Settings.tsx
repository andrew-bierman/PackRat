import { useState } from 'react';
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

export default function Settings() {
  const [user, setUser] = useState(useSelector((state) => state.auth.user));
  const dispatch = useDispatch();

  const [passwords, setPasswords] = useState<any>({});

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
      <XStack space="$3">
        <YStack>
          <Label htmlFor="firstName">Name</Label>
          <Input id="name" value={user.name} onChange={handleChange} />
        </YStack>
        <YStack>
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={user.username} onChange={handleChange} />
        </YStack>
      </XStack>

      <YStack>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={user.email} onChange={handleChange} />
      </YStack>
      <YStack>
        <H5>Preferred units</H5>
        <XStack space>
          <YStack space="$2" flexGrow={1}>
            <Label>Weather: </Label>
            <CustomSelect
              items={['celsius', 'fahrenheit']}
              value={user.preferredWeather}
              onChange={(value) =>
                handleChange({ target: { id: 'preferredWeather', value } })
              }
            />
          </YStack>
          <YStack space="$2" flexGrow={1}>
            <Label>Weight: </Label>
            <CustomSelect
              items={['lb', 'oz', 'kg', 'g']}
              value={user.preferredWeight}
              onChange={(value) =>
                handleChange({ target: { id: 'preferredWeight', value } })
              }
            />
          </YStack>
        </XStack>
      </YStack>
      <Button
        color="white"
        style={{ backgroundColor: '#0284c7' }}
        onPress={handleEditUser}
      >
        Update profile
      </Button>
      <Stack marginTop={20} marginBottom={10}>
        <H2>Change Password</H2>
        <Separator marginVertical={8} />
        <Text fontSize={16}>We will email you to verify the change.</Text>
      </Stack>
      <YStack>
        <Label htmlFor="oldPassword">Old password</Label>
        <Input
          id="oldPassword"
          value={passwords.oldPassword}
          secureTextEntry={true}
          onChange={handlePasswordsChange}
        />
      </YStack>
      <YStack>
        <Label htmlFor="newPassword">New password</Label>
        <Input
          id="newPassword"
          value={passwords.newPassword}
          secureTextEntry={true}
          onChange={handlePasswordsChange}
        />
      </YStack>
      <YStack>
        <Label htmlFor="confirmPassword">Confirm new password</Label>
        <Input
          id="confirmPassword"
          value={passwords.confirmPassword}
          secureTextEntry={true}
          onChange={handlePasswordsChange}
        />
      </YStack>
      <Button
        color="white"
        style={{ backgroundColor: '#0284c7' }}
        onPress={handleUpdatePassword}
      >
        Change password
      </Button>
    </YStack>
  );
}

const CustomSelect = ({ onChange, value, items }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          {items.map((item, i) => (
            <Select.Item index={i} key={item} value={item}>
              <Select.ItemText>{item.toUpperCase()}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
};
