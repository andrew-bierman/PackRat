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
  View
} from "native-base";

import { useState, useEffect } from "react";
import useRegister from "../hooks/useRegister";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { signInWithGoogle } from "./firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { addUser } = useRegister();
  const router = useRouter();

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
            <Input value={name} onChangeText={(text) => setName(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
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
            onPress={() => addUser.mutate({ name, email, password, from: "UserSignIn" })}
            mt="2"
            colorScheme="indigo"
            disabled={!email || !password || !name}
          >
            {addUser.isLoading ? "Loading..." : "Sign up"}
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
          <HStack mt="1" justifyContent="center">
            <Button
              w="100%"
              onPress={() => {
                signInWithGoogle().then(async (res) => {
                  let { email, name } = res
                  if (email && name) {
                    addUser.mutate({ name, email, password: "", from: "GoogleSignIn" });
                    router.push("/sign-in")
                  } else {
                    console.log("Email and Name empty")
                  }
                }).catch((err) => {
                  console.log(err)
                })
              }} mt="2"
              colorScheme="red"
            >
              {"Sign up with google"}
            </Button>
          </HStack>
          {/* Google register */}
        </VStack>
      </Box>
      {addUser.isSuccess && router.push("/sign-in")}
    </Center>
  );
}
