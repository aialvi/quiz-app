import { Box, Flex, Button, Stack, useColorModeValue } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const isAuthenticated = !!localStorage.getItem("userToken");
  const navigate = useNavigate();

  const SignInButton = (
    <Button
      as={"a"}
      fontSize={"sm"}
      fontWeight={600}
      variant={"link"}
      href={"#"}
      _hover={{
        color: "gray.500",
      }}
      onClick={() => navigate("/login")}
    >
      Sign In
    </Button>
  );
  const SignOutButton = (
    <Button
      display={{ base: "none", md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      variant={"link"}
      _hover={{
        color: "gray.500",
      }}
      onClick={() => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("adminToken");
        navigate("/");
      }}
    >
      Sign Out
    </Button>
  );
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 200 }} justify={{ base: "center", md: "start" }}>
          <Link to={"/"}>
            <Button
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              variant={"link"}
              color={"green.400"}
              _hover={{
                color: "gray.500",
              }}
            >
              Quizzard
            </Button>
          </Link>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!isAuthenticated && SignInButton}
          {isAuthenticated && SignOutButton}
        </Stack>
      </Flex>
    </Box>
  );
}
