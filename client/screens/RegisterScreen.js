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
} from "native-base";

import { FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { WEB_CLIENT_ID } from "@env";
import { useState, useEffect } from "react";
// import useRegister from "../hooks/useRegister";
import { useRouter } from "expo-router";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../store/authStore";
import validator from 'validator'

export default function Register() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");



  // const { signupWithEmail } = useRegister();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);

  console.log("USER LOG", user);

  if (user?.user?._id) {
    Toast.show({
      title: user?.message,
      duration: 5000,
      placement: "top-right",
      style: { backgroundColor: "green" },
    });
    router.push("/");
  }

  const registerUser = () => {
    try {
      // const auth = getAuth();
      // createUserWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //     // Signed in
      //     const user = userCredential.user;
      //     if (user) {
      //       console.log({ user });
      //       signupWithEmail(user?.uid, name, email, password);
      //     }
      //   })
      if(validator.isEmpty(name)){
        setNameError('Name is required')
      }
      if(validator.isEmpty(email)){
        setEmailError('Email is required')
      }
      if(!validator.isEmpty(email) && !validator.isEmail(email)){
        setEmailError('Invalid Email')
      }
      if(validator.isEmpty(password)){
        setPasswordError('Password is required')
      }
      if(validator.isEmpty(name) && validator.isEmpty(email) && validator.isEmpty(password)){
        return
      }
      if(!validator.isEmpty(name) && !validator.isEmpty(email) && !validator.isEmpty(password) ){
        dispatch(signUp({ name, email, password }));
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input value={name} onChangeText={(text) =>{
               setName(text)
               setNameError('')
            }} style={{borderColor: nameError ? 'red' : 'gray',borderWidth:1}} />
            {
              nameError ? <Text style={{color:'red'}}>{nameError}</Text> : null
            }
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={(text) => {
             setEmail(text)
              setEmailError('')
            }}
            style={{borderColor: emailError ? 'red' : 'gray',borderWidth:1}}

            />
              {
                emailError ? <Text style={{color:'red'}}>{emailError}</Text> : null
             }
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              onChangeText={(text) => setPassword(text)}
              type="password"
              style={{borderColor: passwordError ? 'red' : 'gray',borderWidth:1}}
            />
             {
                passwordError ? <Text style={{color:'red'}}>{passwordError}</Text> : null
             }
          </FormControl>
          <Button
            onPress={() => registerUser()}
            mt="2"
            colorScheme="indigo"
          >
            {"Sign up"}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Already a User?
            </Text>
            <Link href="/sign-in">
              <Text
                style={{
                  color: "#818cf8",
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
              mt="2"
              onPress={() => {
                promptAsync();
                signInWithGoogle()
                  .then(async (res) => {
                    let { email, name } = res;
                    if (email && name) {
                      addUser.mutate({
                        name,
                        email,
                        password: "",
                        from: "GoogleSignIn",
                      });
                      router.push("/sign-in");
                    } else {
                      console.log("Email and Name empty");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              colorScheme={"red"}
              startIcon={<FontAwesome name="google" size={16} color="white" />}
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
