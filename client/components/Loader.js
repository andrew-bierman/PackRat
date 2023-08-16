import React from "react";
import { Container, Content, HStack, Heading, Spinner } from "native-base";
const Loader = () => {
  return (
    <HStack keyspace={2} marginTop={20} justifyContent="center">
      {" "}
      <Spinner accessibilityLabel="Loading posts" />{" "}
      <Heading color="#0a84ff" fontSize="md">
        {" "}
        Loading{" "}
      </Heading>{" "}
    </HStack>
  );
};
export default Loader;
