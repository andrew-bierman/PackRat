import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  HStack,
  Text,
  View,
  Toast,
} from 'native-base';

import { FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { WEB_CLIENT_ID } from '@env';
import { useState, useEffect } from 'react';
// import useRegister from "../hooks/useRegister";
import { useRouter } from 'expo-router';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithGoogle, signUp } from '../store/authStore';
import { InformUser } from '../utils/ToastUtils';
import useTheme from '../hooks/useTheme';
import { useForm } from 'react-hook-form';
import { InputText, InputTextRules } from '~/components/InputText';
import { useSession } from '../context/auth';

export default function Register() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const { sessionSignIn } = useSession();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const router = useRouter();

  const user = useSelector((state) => state.auth.user);

  if (user?.user?._id) {
    InformUser({
      title: user?.message,
      duration: 5000,
      placement: 'top-right',
      style: { backgroundColor: currentTheme.colors.primary },
    });
    router.push('/');
  }

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID,
  });

  /**
   * Register a user with the given data.
   *
   * @param {object} data - The data object containing the user's name, username, email, and password.
   */
  const registerUser = (data) => {
    const { name, username, email, password } = data;
    try {
      const alphanumeric = /^[a-zA-Z0-9]+$/;
      if (!alphanumeric.test(username)) {
        alert('Username should be alphanumeric');
        return;
      }
      dispatch(signUp({ name, username, email, password })).then(
        ({ payload }) => {
          if (!payload) return;
          if (payload.token) {
            sessionSignIn(payload.token);
          }
        },
      );
    } catch (e) {
      console.log('Error', e);
    }
  };

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isLoggedIn) {
      // router.push("/");
    }
  }, [auth, router]);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      dispatch(signInWithGoogle({ idToken: id_token })).then(({ payload }) => {
        if (!payload) return;
        if (payload.token) {
          sessionSignIn(payload.token);
        }
      });
    }
  }, [response]);

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <InputText
            label="Name"
            control={control}
            name="name"
            rules={InputTextRules.name}
          />

          <InputText
            label="Email ID"
            keyboardType="email-address"
            control={control}
            name="email"
            rules={InputTextRules.email}
          />

          <InputText
            control={control}
            label="Username"
            name="username"
            rules={InputTextRules.username}
          />

          <InputText
            label="Password"
            secureTextEntry
            control={control}
            name="password"
            rules={InputTextRules.password}
          />

          <Button
            isDisabled={!isValid}
            onPress={handleSubmit(registerUser)}
            // onPress={() => registerUser()}
            mt="2"
            colorScheme="indigo"
            // disabled={!email || !password || !name}
          >
            {'Sign up'}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              Already a User?
            </Text>
            <Link href="/sign-in">
              <Text
                style={{
                  color: '#818cf8',
                  fontSize: 12,
                  fontWeight: 400,
                }}
              >
                Login Here
              </Text>
            </Link>
          </HStack>
          {/* Google register */}
          <HStack mt="1" justifyContent="center">
            <Heading
              mt="1"
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Or
            </Heading>
          </HStack>
          {/* Google register */}
          <HStack mt="1" justifyContent="center" alignItems="center">
            <Button
              w="100%"
              mt="2"
              onPress={async () => await promptAsync()}
              colorScheme={'red'}
              startIcon={
                <FontAwesome
                  name="google"
                  size={16}
                  color={currentTheme.colors.white}
                />
              }
            >
              Sign up with Google
            </Button>
          </HStack>
          {/* Google register */}
        </VStack>
      </Box>
      {/* {addUser.isSuccess && router.push("/sign-in")} */}
    </Center>
  );
}
