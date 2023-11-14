import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { RInput, RSeparator, RText, RStack, RButton, RH5, RH2, RScrollView, RLabel } from '@packrat/ui';
import Avatar from '~/components/Avatar';
import { editUser, updatePassword } from '../../store/authStore';
import DropdownComponent from '../../components/Dropdown';

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
    <RScrollView>
      <RStack
        space="$3"
        width="fit-content"
        paddingVertical={20}
        marginHorizontal="auto"
      >
        <RStack>
          <RH2>Profile</RH2>
          <RSeparator marginVertical={8} />
        </RStack>
        <RStack alignItems="center" space style={{flexDirection: 'row'}}>
          <Avatar size={90} src={user.profileImage} />
          <RStack space="$2">
            <RH5 fontWeight="medium">Profile Picture</RH5>
            <RStack space="$2" alignItems="flex-end" style={{flexDirection: 'row'}}>
              <RButton
                size="$3"
                icon={<Ionicons name="cloud-upload-outline" size={24} />}
                color="white"
                style={{ backgroundColor: '#0284c7' }}
                onPress={pickImage}
              >
                Upload
              </RButton>
              <RButton size="$3" onPress={removeProfileImage} style={{backgroundColor:"transparent"}} >
                Remove
              </RButton>
            </RStack>
          </RStack>
        </RStack>
        <RStack space="$3" style={{flexDirection: 'row'}}>
          <RStack space="$2">
            <RLabel htmlFor="firstName">Name</RLabel>
            <RInput id="name" value={user.name} onChange={handleChange} />
          </RStack>
          <RStack space="$2">
            <RLabel htmlFor="username">Username</RLabel>
            <RInput
              id="username"
              value={user.username}
              onChange={handleChange}
            />
          </RStack>
        </RStack>

        <RStack space="$2">
          <RLabel htmlFor="email">Email</RLabel>
          <RInput id="email" value={user.email} onChange={handleChange} />
        </RStack>
        <RStack space="$2">
          <RH5>Preferred units</RH5>
          <RStack space style={{flexDirection: 'row'}}>
            <RStack space="$2" flexGrow={1}>
              <RLabel>Weather: </RLabel>
              <DropdownComponent
                data={['celsius', 'fahrenheit']}
                value={user.preferredWeather}
                onValueChange={(value) =>
                  handleChange({ target: { id: 'preferredWeather', value } })
                }
                width="100%"
              />
            </RStack>
            <RStack space="$2" flexGrow={1}>
              <RLabel>Weight: </RLabel>
              <DropdownComponent
                data={['lb', 'oz', 'kg', 'g']}
                value={user.preferredWeight}
                onValueChange={(value) =>
                  handleChange({ target: { id: 'preferredWeight', value } })
                }
                width="100%"
              />
            </RStack>
          </RStack>
        </RStack>
        <RButton
          color="white"
          style={{ backgroundColor: '#0284c7' }}
          onPress={handleEditUser}
        >
          Update profile
        </RButton>
        <RStack marginTop={20} marginBottom={10}>
          <RH2>Change Password</RH2>
          <RSeparator marginVertical={8} />
          <RText fontSize={16}>We will email you to verify the change.</RText>
        </RStack>
        <RStack space="$2">
          <RLabel htmlFor="oldPassword">Old password</RLabel>
          <RInput
            id="oldPassword"
            value={passwords.oldPassword}
            secureTextEntry={true}
            onChange={handlePasswordsChange}
          />
        </RStack>
        <RStack space="$2">
          <RLabel htmlFor="newPassword">New password</RLabel>
          <RInput
            id="newPassword"
            value={passwords.newPassword}
            secureTextEntry={true}
            onChange={handlePasswordsChange}
          />
        </RStack>
        <RStack space="$2">
          <RLabel htmlFor="confirmPassword">Confirm new password</RLabel>
          <RInput
            id="confirmPassword"
            value={passwords.confirmPassword}
            secureTextEntry={true}
            onChange={handlePasswordsChange}
          />
        </RStack>
        <RButton
          color="white"
          style={{ backgroundColor: '#0284c7' }}
          onPress={handleUpdatePassword}
        >
          Change password
        </RButton>
      </RStack>
    </RScrollView>
  );
}
