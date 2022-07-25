import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  return (
    <Flex p={3} bg="gray.400" align="center" justify="space-between">
      <Text fontSize={20} onClick={() => history.push("/")}>
        Moolre Test
      </Text>

      <Button
        bg="teal"
        color="white"
        onClick={() => history.push("/products/add")}
      >
        Create Product
      </Button>
    </Flex>
  );
};

export default Header;
