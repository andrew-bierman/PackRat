import { AnimatePresence, Button, H1, Label, Spinner, View } from 'tamagui';
import { Input } from './components/inputParts';
import React, { useState, useContext } from 'react';
import { Info } from '@tamagui/lucide-icons';
import { FormCard } from './components/layoutParts';
import { useForm, Controller } from 'react-hook-form';
import {
  Form,
  FormInput,
  FormSelect,
  ImageUpload,
  RH5,
  RIconButton,
  RLabel,
  RStack,
  SubmitButton,
  RText,
} from '@packrat/ui';
import Avatar from '../Avatar/Avatar';
import { useProfileSettings } from 'app/modules/user/hooks';
import Feather from '@expo/vector-icons/Feather';

import {
  deleteUserForm,
  passwordChangeSchema,
  userSettingsSchema,
} from '@packrat/validations';
import { useDeleteProfile } from 'app/modules/user/hooks';
import useResponsive from 'app/hooks/useResponsive';
import ThemeContext from '../../context/theme';
import { Platform } from 'react-native';

export function SettingsForm() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, handleEditUser, handleUpdatePassword } = useProfileSettings();
  const { deleteProfile, isLoading } = useDeleteProfile();
  const { xs, sm, md } = useResponsive();
  const { isDark, enableDarkMode, enableLightMode } = useContext(ThemeContext);

  const iconName = isDark ? 'moon' : 'sun';
  const iconColor = isDark ? 'white' : 'black';
  const handlePress = () => {
    if (isDark) {
      enableLightMode();
    } else {
      enableDarkMode();
    }
  };

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      username: user?.username,
      email: user?.email,
      preferredWeather: user?.preferredWeather,
      preferredWeight: user?.preferredWeight,
      profilepicture: user?.profileImage,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      confirmText: '',
    },
  });

  const weatherOptions = ['celsius', 'fahrenheit'].map((key) => ({
    label: key,
    value: key,
  }));

  const weightOptions = ['lb', 'oz', 'kg', 'g'].map((key) => ({
    label: key,
    value: key,
  }));

  return (
    <FormCard>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '100%',
        }}
        $group-window-gtXs={{ width: 400 }}
        gap="$4"
      >
        <View
          gap="$5"
          style={{
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            maxWidth: '100%',
          }}
        >
          <Form
            validationSchema={userSettingsSchema}
            defaultValues={{
              ...(user ?? {}),
              profileImage: user?.profileImage || '',
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ImageUpload
                hasProfileImage={!!control._defaultValues.profilepicture}
                label={''}
                name="profileImage"
                previewElement={<Avatar size={90} />}
              />
            </View>
            <FormInput label="Name" name="name" />
            <FormInput label="Username" name="username" />
            <FormInput label="Email" name="email" />
            <H1
              style={{
                alignSelf: 'center',
              }}
              size="$8"
              $group-window-xs={{
                size: '$7',
              }}
            >
              Preferred units
            </H1>
            <View
              style={{
                flexDirection: sm || xs ? 'column' : 'row',
                justifyContent: sm || xs ? 'normal' : 'space-between',
              }}
            >
              <View>
                <RLabel>Weather: </RLabel>
                <FormSelect
                  options={weatherOptions}
                  name="value.preferredWeather"
                  fullWidth={!!(xs || sm)}
                />
              </View>
              <View>
                <RLabel>Weight: </RLabel>
                <FormSelect
                  options={weightOptions}
                  name="value.preferredWeight"
                  fullWidth={!!(xs || sm)}
                />
              </View>
            </View>
            <SubmitButton
              themeInverse
              style={{
                marginTop: 16,
                backgroundColor: '#232323',
                color: 'white',
                textAlign: 'center',
              }}
              disabled={loading}
              onSubmit={(data) => handleEditUser(data)}
              cursor={loading ? 'progress' : 'pointer'}
              iconAfter={
                <AnimatePresence>
                  {loading && (
                    <Spinner
                      size="small"
                      color="$color"
                      key="loading-spinner"
                      opacity={1}
                      position="absolute"
                      scale={0.5}
                      left={110}
                      animation="quick"
                      enterStyle={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      exitStyle={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                    />
                  )}
                </AnimatePresence>
              }
            >
              Update Profile
            </SubmitButton>
          </Form>
          {Platform.OS !== 'web' && (
            <RStack
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',

                padding: 5,
              }}
            >
              <RText style={{ fontWeight: 'bold', fontSize: 16 }}>
                Toggle theme
              </RText>
              <RIconButton
                backgroundColor="transparent"
                icon={<Feather name={iconName} size={24} color={iconColor} />}
                onPress={handlePress}
              />
            </RStack>
          )}

          <Form validationSchema={passwordChangeSchema}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <H1
                style={{
                  textAlign: 'center',
                }}
                size="$8"
                $group-window-xs={{
                  size: '$7',
                }}
              >
                Change Password
              </H1>
              <Label size={'$2'}>We will email you to verify the change.</Label>
            </View>
            <View
              style={{ gap: 16, maxWidth: '100%', marginHorizontal: 'auto' }}
            >
              <View>
                <RLabel htmlFor="oldPassword">Old password</RLabel>
                <FormInput
                  id="oldPassword"
                  name="oldPassword"
                  secureTextEntry={true}
                  passwordIconProps={{ color: 'black' }}
                />
              </View>
              <View>
                <RLabel htmlFor="newPassword">New password</RLabel>
                <FormInput
                  id="newPassword"
                  name="newPassword"
                  secureTextEntry={true}
                />
              </View>
              <View>
                <RLabel htmlFor="confirmPassword">Confirm new password</RLabel>
                <FormInput
                  id="confirmPassword"
                  name="confirmPassword"
                  secureTextEntry={true}
                />
              </View>
              <SubmitButton
                themeInverse
                style={{
                  marginTop: 16,
                  backgroundColor: '#232323',
                  color: 'white',
                  alignSelf: 'center',
                  width: '100%',
                }}
                disabled={loading}
                onSubmit={(data) => handleUpdatePassword(data)}
              >
                Change Password
              </SubmitButton>
            </View>
          </Form>
          <Form validationSchema={deleteUserForm}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <H1
                style={{
                  alignSelf: 'center',
                  marginBottom: '10px',
                }}
                size="$8"
                $group-window-xs={{
                  size: '$7',
                }}
              >
                Delete Account
              </H1>
              <Label style={{ textAlign: 'center' }} size={'$2'}>
                Deleting your account will remove all your information from our
                database. This cannot be undone
              </Label>
            </View>
            <View>
              <RLabel htmlFor="confirmText">
                To Confirm This, Type &apos;delete&apos;
              </RLabel>
              <FormInput id="confirmText" name="confirmText" />
              <SubmitButton
                themeInverse
                style={{
                  marginTop: 16,
                  backgroundColor: '#232323',
                  color: 'white',
                  alignSelf: 'center',
                  width: '100%',
                }}
                disabled={loading}
                onSubmit={deleteProfile}
              >
                Delete Profile
              </SubmitButton>
            </View>
          </Form>
        </View>
      </View>
    </FormCard>
  );
}

SettingsForm.fileName = 'SettingsForm';
