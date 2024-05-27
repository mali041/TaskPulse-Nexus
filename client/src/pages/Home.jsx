import { Box, Heading, Button } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Box p="4">
        <Heading>Welcome to the Home Page</Heading>
        <Button colorScheme="teal">Sign In</Button>
      </Box>
    </>
  );
}

export default Home;
