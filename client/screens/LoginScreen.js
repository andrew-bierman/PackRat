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
  Toast,
} from "native-base";

import { FontAwesome } from "@expo/vector-icons";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { WEB_CLIENT_ID } from "@env";

import { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import { useAuth } from "../auth/provider";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { theme } from "../theme";
// import { signInWithGoogle } from "../auth/firebase";
import { signInWithGoogle } from "../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/authStore";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const user = useSelector((state) => state.auth.user);

  console.log("_______++++++++", user);

  if (user?.uid) {
    Toast.show({ title: "Login sucessfully", duration: 5000, placement: 'top-right', style: { backgroundColor: 'green'} })
    router.push("/");
  }

  const { loginUserWithEmailAndPassword, loginUserWithGoogle } = useLogin();

  // Add Google auth-related variables
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID,
  });

  const auth = useSelector((state) => state.auth);
  // Add useEffect hook to listen for auth state changes
  useEffect(() => {
    console.log({ auth });
    if (auth.isLoggedIn) {
      router.push("/");
    }
  }, [auth, router]);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      loginUserWithGoogle(id_token);
    }
  }, [response]);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [code, setCode] = useState("");

  // const [status, setStatus] = useState("login");
  // const [error, setError] = useState("");

  // const dispatch = useDispatch();

  // // const { signInWithEmailPasswordProvider, signInWithGoogleProvider } =
  // //   useAuth();

  // const { loginUserWithEmailAndPassword, loginUserWithGoogle } = useLogin();


  // const router = useRouter();

  // const [token, setToken] = useState("");
  // const [user, setUser] = useState(null);
  // const [accessToken, setAccessToken] = useState(null);

  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId: WEB_CLIENT_ID,
  // });

  // const handleLogin = () => {
  //   dispatch(signIn({ email, password }));
  // };

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     loginUserWithGoogle(id_token);
  //   }
  // }, [response]);

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     setAccessToken(response.authentication.accessToken);
  //     accessToken && fetchUserInfo();
  //   }
  // }, [response, accessToken]);

  // const fetchUserInfo = async () => {
  //   let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   const userInfo = await response.json();
  //   setUser(userInfo);
  // };

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
            onPress={() => loginUserWithEmailAndPassword(email, password)}
            mt="2"
            colorScheme="indigo"
          >
            Sign in
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
              disabled={!request}
              onPress={() => promptAsync()}
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
    </Center>
  );
}
