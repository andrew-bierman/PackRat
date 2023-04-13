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


import { FontAwesome } from "@expo/vector-icons";

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import { useAuth } from "../auth/provider";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { theme } from "../theme";
// import { signInWithGoogle } from "../auth/firebase";
import { signInWithGoogle } from "../auth/firebase";




export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("")

  const [status, setStatus] = useState("login")
  const [error, setError] = useState("")

  const { signInWithEmailPasswordProvider } = useAuth();
  const { loginUser } = useLogin();

  const router = useRouter(); 


  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);


  
  

  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { authentication } = response;
  //     const credential = app.auth.GoogleAuthProvider.credential(authentication.idToken, authentication.accessToken);
  //     app.auth().signInWithCredential(credential).then((userCredential) => {
  //       const user = userCredential.user;
  //       const email = user.email;
  //       loginUser.mutate({ email, password: "", from: "GoogleSignIn" });
  //       signIn({ email, password: "", from: "GoogleSignIn" });
  //       router.push("/");
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // }, [response]);

  // const checkCode = () => {
  //   setError(null)
  //   Axios.post(`${api}/user/checkcode`, { email: email, code: code }).then((res) => {
  //     if (res.data.message == "success") {
  //       setStatus("confirm")
  //     } else {
  //       setError(res.data.message)
  //     }
  //   }).catch(() => {
  //     setError("Error on your browser")
  //   })
  // }
  // const emailExists = () => {
  //   setError(null)
  //   Axios.post(`${api}/user/emailexists`, { email: email }).then((res) => {
  //     if (res.data.message == "success") {
  //       setStatus("verification")
  //     } else {
  //       setError(res.data.message)
  //     }
  //   }).catch(() => {
  //     setError("Error on your browser")
  //   })
  // }
  // const updatePassword = () => {
  //   setError(null)
  //   Axios.post(`${api}/user/updatepassword`, { email: email, password: password }).then((res) => {
  //     if (res.data.message == "success") {
  //       setStatus("login")
  //     } else {
  //       setError(res.data.message)
  //     }
  //   }).catch(() => {
  //     setError("Error on your browser")
  //   })
  // }

  return (
    <Center w="100%">
      {status == "login" && (
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
                signInWithEmailPasswordProvider({ email, password, from: "UserSignIn" });
                router.push("/");
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
            <HStack mt="1" justifyContent="center" alignItems="center">
              <Button
                w="100%"
                onPress={() => {
                  signInWithGoogle();
                }}
                colorScheme={"red"}
                startIcon={
                  <FontAwesome name="google" size={18} color="white" />
                }
              >
                Sign in with Google
              </Button>
            </HStack>
            {/* Google Login */}
          </VStack>
        </Box>
      )}
      {loginUser.isSuccess && router.push("/")}
    </Center>
  );

}
