import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { API_BASE_URL } from "../util.js";
import toast from "react-hot-toast";
import { Box, Heading, Image, Stack, Link, Flex, Text } from "@chakra-ui/react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/logout`, {
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message);
      updateUser(null);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  const handleImageError = (event) => {
    event.target.src = "/path/to/default/avatar.png"; // Fallback image URL
  };

  return (
    <Box p="3" maxW="lg" mx="auto">
      <Heading
        as="h1"
        fontSize="3xl"
        fontWeight="semibold"
        textAlign="center"
        my="7"
      >
        Your Profile
      </Heading>
      <Flex alignItems="center" justifyContent="space-between">
        <Stack direction="row" gap="2">
          <Image
            alt="profile"
            rounded="full"
            h="60px"
            w="60px"
            objectFit="cover"
            cursor="pointer"
            mt="2"
            src={user?.user?.avatar}
            onError={handleImageError}
          />
          <Text as="span" mt="5" fontSize="lg">
            {user?.user?.fullName}
          </Text>
        </Stack>
        <Text
          as="span"
          color="red.600"
          cursor="pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </Text>
      </Flex>
      <Stack gap="4" mt="2">
        <Link
          as={RouterLink}
          to="/create-task"
          p="2"
          bg="green.500"
          rounded="lg"
          textTransform="uppercase"
          textAlign="center"
          textColor="white"
          fontWeight="semibold"
          _hover={{ bg: "green.600" }}
        >
          Create New Task
        </Link>
        <Text textAlign="center">
          <Link
            as={RouterLink}
            to="/tasks"
            color="teal"
            _hover={{ textDecor: "none" }}
          >
            Show Tasks
          </Link>
        </Text>
      </Stack>
    </Box>
  );
}
