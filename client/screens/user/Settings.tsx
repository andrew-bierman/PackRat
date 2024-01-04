import { Ionicons } from '@expo/vector-icons';
import {
  RInput,
  RSeparator,
  RText,
  RStack,
  RButton,
  RH5,
  RH2,
  RScrollView,
  RLabel,
} from '@packrat/ui';
import Avatar from '~/components/Avatar';
import DropdownComponent from '../../components/Dropdown';
import { useProfileSettings } from '~/hooks/user';

export default function Settings() {
  const {
    user,
    passwords,
    pickImage,
    handleChange,
    handleEditUser,
    handlePasswordsChange,
    handleUpdatePassword,
    removeProfileImage,
  } = useProfileSettings();

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
        <RStack alignItems="center" space style={{ flexDirection: 'row' }}>
          <Avatar size={90} src={user.profileImage} />
          <RStack space="$2">
            <RH5 fontWeight="medium">Profile Picture</RH5>
            <RStack
              space="$2"
              alignItems="flex-end"
              style={{ flexDirection: 'row' }}
            >
              <RButton
                size="$3"
                icon={<Ionicons name="cloud-upload-outline" size={24} />}
                color="white"
                style={{ backgroundColor: '#0284c7' }}
                onPress={pickImage}
              >
                Upload
              </RButton>
              <RButton
                size="$3"
                onPress={removeProfileImage}
                style={{ backgroundColor: 'transparent' }}
              >
                Remove
              </RButton>
            </RStack>
          </RStack>
        </RStack>
        <RStack space="$3" style={{ flexDirection: 'row' }}>
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
          <RStack space style={{ flexDirection: 'row' }}>
            <RStack space="$2" flexGrow={1}>
              <RLabel>Weather: </RLabel>
              <DropdownComponent
                data={['celsius', 'fahrenheit']}
                value={user.preferredWeather}
                onValueChange={(value) =>
                  handleChange({ target: { id: 'preferredWeather', value } })
                }
                width="100%"
                placeholder=""
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
                placeholder=""
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
