import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";
import { API_BASE_URL } from "../util.js";
import {
  Flex,
  Box,
  Spacer,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";

export default function NavBar() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/logout`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        updateUser(null);
        navigate("/");
      } else {
        throw new Error("Failed to sign out");
      }
    } catch (error) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  return (
    <Box as="nav" bg="red.50">
      <Flex
        minWidth="max-content"
        alignItems="center"
        p="12px"
        maxW="7xl"
        m="0 auto"
      >
        <Box p="2">
          <Link as={RouterLink} fontSize="lg" fontWeight="bold" to="/">
            TaskPulse-Nexus
          </Link>
        </Box>
        <Spacer />
        <Box>
          {user ? (
            <Menu>
              <MenuButton>
                <Image
                  boxSize="40px"
                  borderRadius="full"
                  src={user?.user?.avatar}
                  alt={user?.user?.username}
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem as={RouterLink} to="/tasks">
                  Tasks
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link as={RouterLink} to="/signin">
              Sign In
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
