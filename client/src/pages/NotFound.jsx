// NotFoundPage.jsx
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt="20">
      <Heading as="h1" size="xl" mb="4">
        404 - Page Not Found
      </Heading>
      <Text fontSize="lg" color="gray.600">
        Oops! Looks like you've reached a page that doesn't exist.
      </Text>
      <Button
        mt="8"
        colorScheme="teal"
        variant="outline"
        onClick={() => {
          navigate("/profile");
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
