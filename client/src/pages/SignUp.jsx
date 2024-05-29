import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  Input,
  Button,
  Text,
  Box,
  Flex,
  Heading,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../util.js";
import { useUser } from "../context/UserContext";

function SignUp() {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const doSubmit = async (values) => {
    const formData = new FormData();
    formData.append("userName", values.userName);
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("avatar", values.avatar[0]);

    // Log FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        body: formData, // No need to set Content-Type header
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Signup failed");
      }

      const data = await response.json();
      toast.success("Account created! You are logged in now");
      updateUser(data);
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Box p="4" maxW="lg" mx="auto">
      <Heading
        as="h1"
        textAlign="center"
        fontSize="4xl"
        fontWeight="semibold"
        my="7"
      >
        Create an Account
      </Heading>
      <form onSubmit={handleSubmit(doSubmit)}>
        <Stack gap="4">
          <FormControl isInvalid={errors.userName}>
            <Input
              id="userName"
              type="text"
              placeholder="Username"
              {...register("userName", { required: "Username is required" })}
            />
            <FormErrorMessage>
              {errors.userName && errors.userName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.fullName}>
            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              {...register("fullName", { required: "Full Name is required" })}
            />
            <FormErrorMessage>
              {errors.fullName && errors.fullName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.avatar}>
            <Input
              py="1"
              id="avatar"
              type="file"
              {...register("avatar", { required: "Avatar is required" })}
            />
            <FormErrorMessage>
              {errors.avatar && errors.avatar.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="teal"
            textTransform="uppercase"
          >
            Sign Up
          </Button>
        </Stack>
      </form>
      <Flex gap="2" mt="5">
        <Text> Have an Account </Text>
        <Link to={"/signin"}>
          <Text as="span" color="blue.400">
            Sign In
          </Text>
        </Link>
      </Flex>
    </Box>
  );
}

export default SignUp;
