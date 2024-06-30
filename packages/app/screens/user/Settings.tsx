import React from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
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
  RIconButton,
  RSpinner,
} from '@packrat/ui';
import Avatar from 'app/components/Avatar/Avatar';
import { useProfileSettings } from 'app/hooks/user';
import { useRouter } from 'app/hooks/router';
import useTheme from 'app/hooks/useTheme';
import {
  userSettingsSchema,
  passwordChangeSchema,
  deleteUserForm,
} from '@packrat/validations';
import { Platform } from 'react-native';
import { useNavigate } from 'app/hooks/navigation';
import { useDeleteProfile } from '../../hooks/user/useDeleteProfile';

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
  const { deleteProfile, isLoading } = useDeleteProfile();

  const { isDark, currentTheme } = useTheme();
  const router = useRouter();
  const navigate = useNavigate();

  return user ? (
    <RScrollView style={{ backgroundColor: isDark ? '#1A1A1D' : 'white' }}>
      <RStack
        gap={8}
        width="fit-content"
        maw="100%"
        paddingVertical={20}
        paddingHorizontal={8}
        marginHorizontal="auto"
        marginVertical={40}
      >
        <RStack
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <RIconButton
            backgroundColor="transparent"
            icon={
              <AntDesign
                name="arrowleft"
                size={24}
                color={isDark ? 'white' : 'black'}
              />
            }
            onPress={() => {
              if (Platform.OS === 'web') {
                window?.history?.back();
              } else {
                navigate('/profile');
              }
            }}
          />
          <RH2>Profile</RH2>
        </RStack>
        <Form
          validationSchema={userSettingsSchema}
          defaultValues={{ ...user, profileImage: user.profileImage || '' }}
        >
          <RStack
            space="$3"
            maw="100%"
            width="fit-content"
            marginHorizontal="auto"
          >
            <ImageUpload
              label="Profile Picture"
              name="profileImage"
              previewElement={<Avatar size={90} />}
            />
            <RStack gap={16} style={{ flexDirection: 'row' }}>
              <RStack f={1}>
                <RLabel htmlFor="firstName">Name</RLabel>
                <FormInput id="name" name="name" />
              </RStack>
              <RStack f={1}>
                <RLabel htmlFor="username">Username</RLabel>
                <FormInput id="username" name="username" />
              </RStack>
            </RStack>
            <RStack>
              <RLabel htmlFor="email">Email</RLabel>
              <FormInput id="email" name="email" />
            </RStack>
            <RStack>
              <RH5>Preferred units</RH5>
              <RStack gap={16} style={{ flexDirection: 'row' }}>
                <RStack f={1}>
                  <RLabel>Weather: </RLabel>
                  <FormSelect
                    options={weatherOptions}
                    name="preferredWeather"
                    style={{ width: '100%' }}
                  />
                </RStack>
                <RStack f={1}>
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
                passwordIconProps={{ color: 'black' }}
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
        <RStack marginTop={20} marginBottom={10}>
          <RH2>Delete account</RH2>
          <RSeparator marginVertical={8} />
          <RText fontSize={16}>
            Deleting your account will remove all your information from our
            database. This cannot be undone
          </RText>
        </RStack>
        <Form validationSchema={deleteUserForm}>
          <RStack width="100%" marginHorizontal="auto">
            <RLabel htmlFor="confirmText">
              To confirm this, type "delete"
            </RLabel>
            <RStack space="$2" flexDirection="row">
              <FormInput
                id="confirmText"
                style={{ minWidth: 268 }}
                name="confirmText"
              />
              <SubmitButton
                onSubmit={deleteProfile}
                disabled={isLoading}
                color="white"
                style={{
                  backgroundColor: 'red',
                  opacity: isLoading ? 0.4 : 1,
                }}
              >
                {isLoading ? <RSpinner color="#f6f6f6" /> : 'Delete account'}
              </SubmitButton>
            </RStack>
          </RStack>
        </Form>
      </RStack>
    </RScrollView>
  ) : null;
}
