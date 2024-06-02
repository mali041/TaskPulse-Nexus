import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import {
  Home,
  SignIn,
  SignUp,
  Profile,
  CreateTask,
  UpdateTask,
  Tasks,
  SingleTask,
  NotFound,
} from "./pages";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <UserProvider>
        <ChakraProvider>
          <Router>
            <NavBar />
            <Toaster position="bottom-right" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/update-task/:taskId" element={<UpdateTask />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/:taskId" element={<SingleTask />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ChakraProvider>
      </UserProvider>
    </>
  );
}

export default App;
