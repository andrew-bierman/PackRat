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
  Form,
  ImageUpload,
  FormInput,
  FormSelect,
  SubmitButton,
} from '@packrat/ui';
import Avatar from 'app/components/Avatar/Avatar';
import { useProfileSettings } from 'app/hooks/user';
import { userSettingsSchema, passwordChangeSchema } from '@packrat/validations';

const weatherOptions = ['celsius', 'fahrenheit'].map((key) => ({
  label: key,
  value: key,
}));

const weightOptions = ['lb', 'oz', 'kg', 'g'].map((key) => ({
  label: key,
  value: key,
}));

export default function Settings() {
  const { user, handleEditUser, handlePasswordsChange, handleUpdatePassword } =
    useProfileSettings();

  return user ? (
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
        <Form
          validationSchema={userSettingsSchema}
          defaultValues={{ ...user, profileImage: user.profileImage || '' }}
        >
          <RStack space="$3" width="fit-content" marginHorizontal="auto">
            <ImageUpload
              label="Profile Picture"
              name="profileImage"
              previewElement={<Avatar size={90} />}
            />
            <RStack space="$3" style={{ flexDirection: 'row' }}>
              <RStack space="$2">
                <RLabel htmlFor="firstName">Name</RLabel>
                <FormInput id="name" name="name" />
              </RStack>
              <RStack space="$2">
                <RLabel htmlFor="username">Username</RLabel>
                <FormInput id="username" name="username" />
              </RStack>
            </RStack>
            <RStack space="$2">
              <RLabel htmlFor="email">Email</RLabel>
              <FormInput id="email" name="email" />
            </RStack>
            <RStack space="$2">
              <RH5>Preferred units</RH5>
              <RStack space style={{ flexDirection: 'row' }}>
                <RStack space="$2" flexGrow={1}>
                  <RLabel>Weather: </RLabel>
                  <FormSelect
                    options={weatherOptions}
                    name="preferredWeather"
                    style={{ width: '100%' }}
                  />
                </RStack>
                <RStack space="$2" flexGrow={1}>
                  <RLabel>Weight: </RLabel>
                  <FormSelect
                    options={weightOptions}
                    name="preferredWeight"
                    style={{ width: '100%' }}
                  />
                </RStack>
              </RStack>
            </RStack>
            <SubmitButton
              onSubmit={handleEditUser}
              color="white"
              style={{ backgroundColor: '#0284c7' }}
            >
              Update profile
            </SubmitButton>
          </RStack>
        </Form>

        <RStack marginTop={20} marginBottom={10}>
          <RH2>Change Password</RH2>
          <RSeparator marginVertical={8} />
          <RText fontSize={16}>We will email you to verify the change.</RText>
        </RStack>
        <Form validationSchema={passwordChangeSchema}>
          <RStack space="$3" width="100%" marginHorizontal="auto">
            <RStack space="$2">
              <RLabel htmlFor="oldPassword">Old password</RLabel>
              <FormInput
                id="oldPassword"
                name="oldPassword"
                secureTextEntry={true}
              />
            </RStack>
            <RStack space="$2">
              <RLabel htmlFor="newPassword">New password</RLabel>
              <FormInput
                id="newPassword"
                name="newPassword"
                secureTextEntry={true}
              />
            </RStack>
            <RStack space="$2">
              <RLabel htmlFor="confirmPassword">Confirm new password</RLabel>
              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                secureTextEntry={true}
              />
            </RStack>
            <SubmitButton
              onSubmit={handleUpdatePassword}
              color="white"
              style={{ backgroundColor: '#0284c7' }}
            >
              Change password
            </SubmitButton>
          </RStack>
        </Form>
      </RStack>
    </RScrollView>
  ) : null;
}
