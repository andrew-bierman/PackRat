import {
  AnimatePresence,
  Button,
  H1,
  Label,
  Spinner,
  View,
} from 'tamagui';
import { Input } from './components/inputParts';
import { useState } from 'react';
import { Info } from '@tamagui/lucide-icons';
import { FormCard } from './components/layoutParts';
import { useForm, Controller } from 'react-hook-form';
import {
  Form,
  FormInput,
  FormSelect,
  ImageUpload,
  RH5,
  RLabel,
  RStack,
  SubmitButton,
} from '@packrat/ui';
import Avatar from '../Avatar/Avatar';
import { useProfileSettings } from 'app/modules/user/hooks';
import {
  deleteUserForm,
  passwordChangeSchema,
  userSettingsSchema,
} from '@packrat/validations';
import { useDeleteProfile } from 'app/modules/user/hooks';

export function SettingsForm() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, handleEditUser, handleUpdatePassword } = useProfileSettings();
  const { deleteProfile, isLoading } = useDeleteProfile();


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
      <RStack
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '100%',
        }}
        $group-window-gtXs={{ width: 400 }}
        gap="$4"
      >
        {/* <H1
            alignSelf="center"
            size="$8"
            $group-window-xs={{
              size: '$7',
            }}
          >
            Create an account
          </H1> */}
        <RStack
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
            defaultValues={{ ...user, profileImage: user.profileImage || '' }}
          >
            <RStack
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '100%',
              }}
            >
              <ImageUpload
                label="Profile Picture"
                name="profileImage"
                previewElement={<Avatar size={90} />}
              />
            </RStack>
            <FormInput label="Name" name="name" />
            <FormInput label="Username" name="username" />
            <FormInput label="Email" name="email" />
            <RStack
              style={{
                alignItems: 'center',
              }}
            >
              <RH5>Preferred units</RH5>
            </RStack>
            <RStack
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <RStack>
                <RLabel>Weather: </RLabel>
                <FormSelect
                  options={weatherOptions}
                  name="preferredWeather"
                  style={{ width: '100%' }}
                />
              </RStack>
              <RStack>
                <RLabel>Weight: </RLabel>
                <FormSelect
                  options={weightOptions}
                  name="preferredWeight"
                  style={{ width: '100%' }}
                />
              </RStack>
            </RStack>
            <SubmitButton
              themeInverse
              style={{
                marginTop: 16,
                backgroundColor: '#232323',
                color: 'white',
              }}
              disabled={loading}
              onSubmit={(data) => handleEditUser(data)}
              cursor={loading ? 'progress' : 'pointer'}
              alignSelf="center"
              width={'100%'}
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

          <Form validationSchema={passwordChangeSchema}>
            <RStack
              style={{
                flexWrap: 'wrap',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '100%',
              }}
            >
              <H1
                style={{
                  alignSelf: 'center',
                }}
                size="$8"
                $group-window-xs={{
                  size: '$7',
                }}
              >
                Change Password
              </H1>
              <Label size={'$2'}>We will email you to verify the change.</Label>
            </RStack>
            <RStack
              style={{ gap: 16, maxWidth: '100%', marginHorizontal: 'auto' }}
            >
              <RStack>
                <RLabel htmlFor="oldPassword">Old password</RLabel>
                <FormInput
                  id="oldPassword"
                  name="oldPassword"
                  secureTextEntry={true}
                  passwordIconProps={{ color: 'black' }}
                />
              </RStack>
              <RStack>
                <RLabel htmlFor="newPassword">New password</RLabel>
                <FormInput
                  id="newPassword"
                  name="newPassword"
                  secureTextEntry={true}
                />
              </RStack>
              <RStack>
                <RLabel htmlFor="confirmPassword">Confirm new password</RLabel>
                <FormInput
                  id="confirmPassword"
                  name="confirmPassword"
                  secureTextEntry={true}
                />
              </RStack>
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
            </RStack>
          </Form>
          <Form validationSchema={deleteUserForm}>
            <RStack
              style={{
                flexWrap: 'wrap',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '100%',
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
              <Label size={'$2'}>
                Deleting your account will remove all your information from our
                database. This cannot be undone
              </Label>
            </RStack>
            <RStack>
              <RLabel htmlFor="confirmText">
                To Confirm This, Type 'delete'
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
            </RStack>
          </Form>
        </RStack>
      </RStack>
    </FormCard>
  );
}

SettingsForm.fileName = 'SettingsForm';
