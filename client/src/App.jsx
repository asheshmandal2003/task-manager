import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import Signin from "./components/auth/signin/Signin";
import { useSelector } from "react-redux";
import Home from "./components/home/Home";
import Task from "./components/tasks/Task";
import CreateTask from "./components/tasks/taskOptions/CreateTask";
import EditTask from "./components/tasks/taskOptions/EditTask";
import Error from "./components/error/Error";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <Box>
      <Routes>
        <Route
          path="/auth/signup"
          element={!user ? <Signup /> : <Navigate to="/task-manager" />}
        />
        <Route
          path="/auth/signin"
          element={!user ? <Signin /> : <Navigate to="/task-manager" />}
        />
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/task-manager" />
            ) : (
              <Navigate to="/auth/signin" />
            )
          }
        />
        <Route
          path="/task-manager"
          element={user ? <Home /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/tasks/:id"
          element={user ? <Task /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/tasks/new"
          element={user ? <CreateTask /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/tasks/:id/edit"
          element={user ? <EditTask /> : <Navigate to="auth/signin" />}
        />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
      <ToastContainer />
    </Box>
  );
}

export default App;
