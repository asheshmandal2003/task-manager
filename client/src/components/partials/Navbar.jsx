import { Assignment, Phone } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AvatarWithMenu from "./Avatar";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { logout } from "../../state/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phone = useMediaQuery("(max-width:1000px)");
  const [loggingOut, setLoggingOut] = useState(false)
  const token = useSelector(state=>state.token)

  const logOut = async () => {
    setLoggingOut(true)
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    })
      .then((res) => {
        dispatch(logout());
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setLoggingOut(false)
        navigate("/auth/signin");
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setLoggingOut(false)
      });
  };

  return (
    <AppBar position="static" sx={{ width: "100vw" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Assignment
            sx={{
              display: {
                xs: phone ? "flex" : "none",
                md: phone ? "none" : "flex",
              },
              fontSize: phone ? 30 : 38,
              color: "#fff",
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            component="div"
            noWrap
            onClick={() => navigate("/task-manager")}
            sx={{
              mr: 2,
              display: {
                xs: phone ? "flex" : "none",
                md: phone ? "none" : "flex",
              },
              fontWeight: 500,
              fontSize: phone ? 16 : 20,
              color: "#fff",
              flexGrow: 1,
              cursor: "pointer",
            }}
          >
            Task Manager
          </Typography>
          <Box>
            <AvatarWithMenu phone={phone} logOut={logOut} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
