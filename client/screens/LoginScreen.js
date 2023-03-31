import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";
// import { Platform } from "react-native";

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import { useAuth } from "../auth/provider";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { theme } from "../theme";
import { WEB_CLIENT_ID } from "@env"
import { ANDROID_CLIENT_ID } from "@env"


WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();
  const { loginUser } = useLogin();

  const router = useRouter();
  // -------------------------------------------------------------------
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    // expoClientId: ANDROID_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    // iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  if (userInfo) {
    if (userInfo.email && userInfo.from) {
      loginUser.mutate(userInfo);
      signIn(userInfo);
      { router.push("/") }
    }
  }

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      setUserInfo({ email: user.email, password: "", from: "GoogleSignIn" });
    } catch (error) {
      // Add your own error handler here
    }
  };
  // -------------------------------------------------------------------

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          <Text>Welcome</Text>
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input value={email} onChangeText={(text) => setEmail(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              onChangeText={(text) => setPassword(text)}
              type="password"
            />
          </FormControl>
          <Button
            disabled={!email || !password}
            onPress={() => {
              loginUser.mutate({ email, password, from: "UserSignIn" });
              signIn({ email, password, from: "UserSignIn" });
            }}
            mt="2"
            colorScheme="indigo"
          >
            {loginUser.isLoading ? "Loading...." : "Sign in"}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.
            </Text>
            <Link href="/register">
              <Text
                style={{
                  color: "#818cf8",
                  fontWeight: 400,
                  fontSize: 12,
                }}
              >
                Sign Up
              </Text>
            </Link>
          </HStack>
          {/* Google Login starts*/}
          <HStack mt="6" justifyContent="center">
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Or
            </Heading>
          </HStack>
          <HStack mt="1" justifyContent="center">
            <Button
              w="100%"
              onPress={() => {
                promptAsync();
              }}
              mt="2"
              colorScheme="red"
            >
              {"Sign in with Google"}
            </Button>
          </HStack>
          {/* Google Login */}
        </VStack>
      </Box>
      {loginUser.isSuccess && router.push("/")}
    </Center>
  );
}
