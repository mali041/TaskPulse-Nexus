import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { Home, SignIn, SignUp, Profile } from "./pages";

import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <UserProvider>
        <ChakraProvider>
          <Router>
            <Toaster position="bottom-right" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </Router>
        </ChakraProvider>
      </UserProvider>
    </>
  );
}

export default App;