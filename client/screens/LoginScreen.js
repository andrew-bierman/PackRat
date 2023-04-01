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

import { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import { useAuth } from "../auth/provider";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { theme } from "../theme";
import { signInWithGoogle } from "./firebase";




export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();
  const { loginUser } = useLogin();

  const router = useRouter();

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
              router.push("/")
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
                signInWithGoogle().then(async (res) => {
                  let { email } = res
                  if (email) {
                    loginUser.mutate({ email, password: "", from: "GoogleSignIn" });
                    signIn({ email: res.email, password: "", from: "GoogleSignIn" });
                    router.push("/")
                  } else {
                    console.log("email Empty")
                  }
                }).catch((err) => {
                  console.log(err)
                })
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
