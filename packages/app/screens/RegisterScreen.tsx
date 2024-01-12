import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { RHeading, RStack, RButton, RText, RIconButton } from '@packrat/ui';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithGoogle, signUp } from '../store/authStore';
import { InformUser } from '../utils/ToastUtils';
import useTheme from '../hooks/useTheme';
import { useForm } from 'react-hook-form';
import { InputText, InputTextRules } from '../components/InputText';
import { useSession } from '../context/auth';
import { useGoogleAuth } from '../hooks/login';
import { useRegisterUser } from '../hooks/user';

export default function Register() {
  const { currentTheme } = useTheme();
  const {
    registerUser,
    form: {
      control,
      handleSubmit,
      formState: { isValid },
    },
  } = useRegisterUser();
  const { promptAsync } = useGoogleAuth();

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={{ paddingTop: '32px', width: '90%', maxWidth: '290px' }}>
        <RHeading fontSize={32} color="#212121" fontWeight="semibold">
          Welcome
        </RHeading>
        <RHeading
          color="grey"
          fontWeight="medium"
          fontSize={14}
          style={{ marginTop: '8px' }}
        >
          Sign up to continue!
        </RHeading>
        <RStack style={{ marginTop: '16px', gap: '8px' }}>
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

          <RButton
            disabled={!isValid}
            onPress={handleSubmit(registerUser)}
            // onPress={() => registerUser()}
            style={{ marginTop: '16px' }}
            backgroundColor="mediumpurple"
          >
            {'Sign up'}
          </RButton>
          <RStack
            style={{
              marginTop: '16px',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <RText fontSize={14} color="grey">
              Already a User?
            </RText>
            <Link href="/sign-in">
              <RText
                style={{
                  color: '#818cf8',
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                Login Here
              </RText>
            </Link>
          </RStack>
          {/* Google register */}
          <RStack
            style={{
              marginTop: '8px',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <RText color="grey" fontWeight="medium" fontSize={14}>
              Or
            </RText>
          </RStack>
          {/* Google register */}
          <RStack
            style={{
              marginTop: '8px',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RIconButton
              onPress={async () => await promptAsync()}
              backgroundColor="red"
              style={{ width: '100%', color: 'white' }}
              icon={
                <FontAwesome
                  name="google"
                  size={16}
                  color={currentTheme.colors.white}
                />
              }
            >
              Sign up with Google
            </RIconButton>
          </RStack>
          {/* Google register */}
        </RStack>
      </View>
      {/* {addUser.isSuccess && router.push("/sign-in")} */}
    </View>
  );
}
