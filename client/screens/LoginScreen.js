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
  View,
} from "native-base";

import { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import { useAuth } from "../auth/provider";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { theme } from "../theme";
import { signInWithGoogle } from "./firebase";
import Axios from 'axios'
import { api } from '../constants/api'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("")

  const [status, setStatus] = useState("login")
  const [error, setError] = useState("")

  const { signIn } = useAuth();
  const { loginUser } = useLogin();

  const router = useRouter();

  const checkCode = () => {
    setError(null)
    Axios.post(`${api}/user/checkcode`, { email: email, code: code }).then((res) => {
      if (res.data.message == "success") {
        setStatus("confirm")
      } else {
        setError(res.data.message)
      }
    }).catch(() => {
      setError("Error on your browser")
    })
  }
  const emailExists = () => {
    setError(null)
    Axios.post(`${api}/user/emailexists`, { email: email }).then((res) => {
      if (res.data.message == "success") {
        setStatus("verification")
      } else {
        setError(res.data.message)
      }
    }).catch(() => {
      setError("Error on your browser")
    })
  }
  const updatePassword = () => {
    setError(null)
    Axios.post(`${api}/user/updatepassword`, { email: email, password: password }).then((res) => {
      if (res.data.message == "success") {
        setStatus("login")
      } else {
        setError(res.data.message)
      }
    }).catch(() => {
      setError("Error on your browser")
    })
  }

  return (
    <Center w="100%">
      {status == "login" &&
        < Box safeArea p="2" py="8" w="90%" maxW="290">
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
            <Text
              fontSize="sm"
              color="coolBlue.600"
              _dark={{
                color: "warmGray.200",
              }}
              onPress={() => { setStatus("email") }}
            >
              forgot password
            </Text>
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
      }
      < Box safeArea p="2" py="8" w="90%" maxW="290">
        <VStack space={3} mt="5">
          {status == "email" &&
            <View>
              <Text style={{ color: "red" }}>{error}</Text>
              <FormControl>
                <FormControl.Label>Enter Email ID</FormControl.Label>
                <Input value={email} onChangeText={(text) => setEmail(text)} />
              </FormControl>
              <Button
                disabled={!email}
                onPress={emailExists}
                mt="2"
                colorScheme="indigo"
              >
                {loginUser.isLoading ? "Loading...." : "Search email"}
              </Button>
            </View>
          }
          {status == "verification" &&
            <View>
              <Text style={{ color: "red" }}>{error}</Text>
              <FormControl>
                <FormControl.Label>Enter Verification code</FormControl.Label>
                <Input value={code} onChangeText={(text) => setCode(text)} />
              </FormControl>
              <Button
                disabled={!code}
                onPress={checkCode}
                mt="2"
                colorScheme="indigo"
              >
                {loginUser.isLoading ? "Loading...." : "Verify"}
              </Button>
            </View>}
          {status == "confirm" &&
            <View>
              <Text style={{ color: "red" }}>{error}</Text>
              <FormControl>
                <FormControl.Label>Enter new password</FormControl.Label>
                <Input value={password} onChangeText={(text) => setPassword(text)} />
              </FormControl>
              <Button
                disabled={!password}
                onPress={updatePassword}
                mt="2"
                colorScheme="indigo"
              >
                {loginUser.isLoading ? "Loading...." : "Change password"}
              </Button>
            </View>
          }
        </VStack>
      </Box>
      {loginUser.isSuccess && router.push("/")}
    </Center >
  );

}
