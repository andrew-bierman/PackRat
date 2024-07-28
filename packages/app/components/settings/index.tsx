import {
  AnimatePresence,
  Button,
  H1,
  Label,
  RadioGroup,
  Spinner,
  View,
} from 'tamagui';
import { Input } from './components/inputParts';
import { useState } from 'react';
import { Eye, EyeOff, Info } from '@tamagui/lucide-icons';
import { FormCard } from './components/layoutParts';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUpload } from '@packrat/ui';
import Avatar from '../Avatar/Avatar';
import { useProfileSettings } from '../../hooks/user';
import { UploadFile } from './components/UploadFile';
import { H4 } from 'tamagui';

const schema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmedPassword: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters' }),
    postalCode: z.string().min(4, {
      message: 'Invalid postal code format',
    }),
    accountType: z.string().min(1, { message: 'Account type is required' }),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: 'Passwords do not match',
    path: ['confirmedPassword'],
  });

export function SettingsForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, handleEditUser, handleUpdatePassword } = useProfileSettings();
  console.log('useruseruseruser', user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name,
      username: user?.username,
      email: user?.email,
      preferredWeather: user?.preferredWeather,
      preferredWeight: user?.preferredWeight,
      profilepicture: user?.profilePicture,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      confirmText: '',
    },
  });
  const onSubmit = (data: z.infer<typeof schema>) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
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
        {/* <H1
            alignSelf="center"
            size="$8"
            $group-window-xs={{
              size: '$7',
            }}
          >
            Create an account
          </H1> */}
        <View
          gap="$5"
          style={{
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            maxWidth: '100%',
          }}
        >
          {/* <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: '100%',
            }}
            columnGap="$4"
            rowGap="$5"
          >
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '100%',
              }}
            >
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    {...(errors.Name && {
                      theme: 'red',
                    })}
                    maxWidth="48%"
                    $group-window-gtXs={{
                      minWidth: 'inherit',
                    }}
                    onBlur={onBlur}
                    size="$4"
                    f={1}
                    flexBasis={150}
                    animation="quickest"
                  >
                    <Input.Label>Name</Input.Label>
                    <Input.Box>
                      <Input.Area
                        placeholder=""
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input.Box>
                    <AnimatePresence>
                      {errors.Name && (
                        <View
                          bottom="$-5"
                          left={0}
                          position="absolute"
                          gap="$2"
                          flexDirection="row"
                          animation="bouncy"
                          scaleY={1}
                          enterStyle={{
                            opacity: 0,
                            y: -10,
                            scaleY: 0.5,
                          }}
                          exitStyle={{
                            opacity: 0,
                            y: -10,
                            scaleY: 0.5,
                          }}
                        >
                          <Input.Icon padding={0}>
                            <Info />
                          </Input.Icon>
                          <Input.Info>{errors.firstName.message}</Input.Info>
                        </View>
                      )}
                    </AnimatePresence>
                  </Input>
                )}
              />
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    {...(errors.lastName && {
                      theme: 'red',
                    })}
                    onBlur={onBlur}
                    maxWidth="48%"
                    size="$4"
                    f={1}
                    flexBasis={150}
                  >
                    <Input.Label>Username</Input.Label>
                    <Input.Box>
                      <Input.Area
                        placeholder=""
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input.Box>
                    <AnimatePresence>
                      {errors.Username && (
                        <View
                          bottom="$-5"
                          left={0}
                          position="absolute"
                          gap="$2"
                          flexDirection="row"
                          animation="bouncy"
                          scaleY={1}
                          enterStyle={{
                            opacity: 0,
                            y: -10,
                            scaleY: 0.5,
                          }}
                          exitStyle={{
                            opacity: 0,
                            y: -10,
                            scaleY: 0.5,
                          }}
                        >
                          <Input.Icon padding={0}>
                            <Info />
                          </Input.Icon>
                          <Input.Info>{errors.lastName.message}</Input.Info>
                        </View>
                      )}
                    </AnimatePresence>
                  </Input>
                )}
              />
            </View>
          </View> */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '100%',
                }}
              >
                <UploadFile />
              </View>
            )}
          />
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...(errors.name && {
                  theme: 'red',
                })}
                onBlur={onBlur}
                size="$4"
              >
                <Input.Label>Name</Input.Label>
                <Input.Box>
                  <Input.Area
                    placeholder=""
                    onChangeText={onChange}
                    value={value}
                  />
                </Input.Box>
                <AnimatePresence>
                  {errors.name && (
                    <View
                      bottom="$-5"
                      left={0}
                      position="absolute"
                      gap="$2"
                      flexDirection="row"
                      animation="bouncy"
                      scaleY={1}
                      enterStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                      exitStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                    >
                      <Input.Icon padding={0}>
                        <Info />
                      </Input.Icon>
                      <Input.Info>{errors.email.message}</Input.Info>
                    </View>
                  )}
                </AnimatePresence>
              </Input>
            )}
          />
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...(errors.username && {
                  theme: 'red',
                })}
                onBlur={onBlur}
                size="$4"
              >
                <Input.Label>Username</Input.Label>
                <Input.Box>
                  <Input.Area
                    placeholder=""
                    onChangeText={onChange}
                    value={value}
                  />
                </Input.Box>
                <AnimatePresence>
                  {errors.username && (
                    <View
                      bottom="$-5"
                      left={0}
                      position="absolute"
                      gap="$2"
                      flexDirection="row"
                      animation="bouncy"
                      scaleY={1}
                      enterStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                      exitStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                    >
                      <Input.Icon padding={0}>
                        <Info />
                      </Input.Icon>
                      <Input.Info>{errors.email.message}</Input.Info>
                    </View>
                  )}
                </AnimatePresence>
              </Input>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...(errors.email && {
                  theme: 'red',
                })}
                onBlur={onBlur}
                size="$4"
              >
                <Input.Label>Email</Input.Label>
                <Input.Box>
                  <Input.Area
                    placeholder=""
                    onChangeText={onChange}
                    value={value}
                  />
                </Input.Box>
                <AnimatePresence>
                  {errors.email && (
                    <View
                      bottom="$-5"
                      left={0}
                      position="absolute"
                      gap="$2"
                      flexDirection="row"
                      animation="bouncy"
                      scaleY={1}
                      enterStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                      exitStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                    >
                      <Input.Icon padding={0}>
                        <Info />
                      </Input.Icon>
                      <Input.Info>{errors.email.message}</Input.Info>
                    </View>
                  )}
                </AnimatePresence>
              </Input>
            )}
          />
          <Controller
            control={control}
            name="preferredWeather"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Label htmlFor={'preferredWeather'}>
                  Preferred Weather Unit
                </Label>
                <RadioGroup
                  gap="$8"
                  flexDirection="row"
                  value={value}
                  onValueChange={onChange}
                  id={'preferredWeather'}
                >
                  {weatherOptions.map((option) => {
                    return (
                      <>
                        <View flexDirection="row" alignItems="center" gap="$3">
                          <RadioGroup.Item
                            id={option.value}
                            value={option.value}
                          >
                            <RadioGroup.Indicator />
                          </RadioGroup.Item>

                          <Input.Label htmlFor={option.label}>
                            {option.label}
                          </Input.Label>
                        </View>
                      </>
                    );
                  })}
                </RadioGroup>
              </View>
            )}
          />
          <Controller
            control={control}
            name="preferredWeight"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Label htmlFor={'preferredWeight'}>Preferred Weight Unit</Label>
                <RadioGroup
                  gap="$8"
                  flexDirection="row"
                  value={value}
                  onValueChange={onChange}
                  id={'preferredWeight'}
                >
                  {weightOptions.map((option) => {
                    console.log('optionoption', option);
                    return (
                      <>
                        <View flexDirection="row" alignItems="center" gap="$3">
                          <RadioGroup.Item
                            id={'personal-t1'}
                            value={option.value}
                          >
                            <RadioGroup.Indicator />
                          </RadioGroup.Item>

                          <Input.Label htmlFor={'personal-t1'}>
                            {option.label}
                          </Input.Label>
                        </View>
                      </>
                    );
                  })}
                </RadioGroup>
              </View>
            )}
          />
          <Button
            themeInverse
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
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
          </Button>
          <View
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
          </View>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...(errors.oldPassword && {
                  theme: 'red',
                })}
                onBlur={onBlur}
                size="$4"
              >
                <Input.Label htmlFor={'oldPassword'}>Old Password</Input.Label>
                <Input.Box>
                  <Input.Area
                    id={'oldPassword'}
                    secureTextEntry={!showPassword}
                    placeholder=""
                    onChangeText={onChange}
                    value={value}
                  />
                  <Input.Icon
                    cursor="pointer"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye color="$gray11" />
                    ) : (
                      <EyeOff color="$gray11" />
                    )}
                  </Input.Icon>
                </Input.Box>
                <AnimatePresence>
                  {errors.password && (
                    <View
                      bottom="$-5"
                      left={0}
                      position="absolute"
                      gap="$2"
                      flexDirection="row"
                      animation="bouncy"
                      scaleY={1}
                      enterStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                      exitStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                    >
                      <Input.Icon padding={0}>
                        <Info />
                      </Input.Icon>
                      <Input.Info>{errors.password.message}</Input.Info>
                    </View>
                  )}
                </AnimatePresence>
              </Input>
            )}
          />
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...(errors.newPassword && {
                  theme: 'red',
                })}
                onBlur={onBlur}
                size="$4"
              >
                <Input.Label htmlFor={'newPassword'}>New Password</Input.Label>
                <Input.Box>
                  <Input.Area
                    id={'password-t1'}
                    secureTextEntry={!showPassword}
                    placeholder=""
                    onChangeText={onChange}
                    value={value}
                  />
                  <Input.Icon
                    cursor="pointer"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye color="$gray11" />
                    ) : (
                      <EyeOff color="$gray11" />
                    )}
                  </Input.Icon>
                </Input.Box>
                <AnimatePresence>
                  {errors.password && (
                    <View
                      bottom="$-5"
                      left={0}
                      position="absolute"
                      gap="$2"
                      flexDirection="row"
                      animation="bouncy"
                      scaleY={1}
                      enterStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                      exitStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                    >
                      <Input.Icon padding={0}>
                        <Info />
                      </Input.Icon>
                      <Input.Info>{errors.password.message}</Input.Info>
                    </View>
                  )}
                </AnimatePresence>
              </Input>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...(errors.confirmPassword && {
                  theme: 'red',
                })}
                onBlur={onBlur}
                size="$4"
              >
                <Input.Label htmlFor={'confirmPassword'}>
                  Confirm New Password
                </Input.Label>
                <Input.Box>
                  <Input.Area
                    id={'confirmPassword'}
                    secureTextEntry={!showConfirmPassword}
                    placeholder=""
                    onChangeText={onChange}
                    value={value}
                  />
                  <Input.Icon
                    cursor="pointer"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Eye color="$gray11" />
                    ) : (
                      <EyeOff color="$gray11" />
                    )}
                  </Input.Icon>
                </Input.Box>
                <AnimatePresence>
                  {errors.confirmedPassword && (
                    <View
                      bottom="$-5"
                      left={0}
                      position="absolute"
                      gap="$2"
                      flexDirection="row"
                      animation="bouncy"
                      scaleY={1}
                      enterStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                      exitStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                    >
                      <Input.Icon padding={0}>
                        <Info />
                      </Input.Icon>
                      <Input.Info>
                        {errors.confirmedPassword.message}
                      </Input.Info>
                    </View>
                  )}
                </AnimatePresence>
              </Input>
            )}
          />
          <Button
            themeInverse
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
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
            Change Password
          </Button>
          <View
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
          </View>
          <Controller
            control={control}
            name="confirmText"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...(errors.confirmPassword && {
                  theme: 'red',
                })}
                onBlur={onBlur}
                size="$4"
              >
                <Input.Label htmlFor={'confirmText'}>
                  To Confirm This, Type 'delete'
                </Input.Label>
                <Input.Box>
                  <Input.Area
                    id={'confirmText'}
                    placeholder=""
                    onChangeText={onChange}
                    value={value}
                  />
                </Input.Box>
                <AnimatePresence>
                  {errors.confirmText && (
                    <View
                      bottom="$-5"
                      left={0}
                      position="absolute"
                      gap="$2"
                      flexDirection="row"
                      animation="bouncy"
                      scaleY={1}
                      enterStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                      exitStyle={{
                        opacity: 0,
                        y: -10,
                        scaleY: 0.5,
                      }}
                    >
                      <Input.Icon padding={0}>
                        <Info />
                      </Input.Icon>
                      <Input.Info>{errors.confirmText.message}</Input.Info>
                    </View>
                  )}
                </AnimatePresence>
              </Input>
            )}
          />
          <Button
            themeInverse
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
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
            Delete
          </Button>
        </View>
      </View>
    </FormCard>
  );
}

SettingsForm.fileName = 'SettingsForm';
