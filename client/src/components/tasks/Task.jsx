import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FlexCenter } from "../partials/FlexCenter";
import Navbar from "../partials/Navbar";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function Task() {
  const token = useSelector((state) => state.token);
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const phone = useMediaQuery("(max-width:700px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (event) => setAnchorEl(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchTask() {
      await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_GATEWAY_URL}/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setTask(res.data);
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
        });
    }
    fetchTask();
  }, []);

  const deleteTask = async () => {
    setDeleting(true);
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_GATEWAY_URL}/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setDeleting(false);
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
        navigate("/task-manager");
      })
      .catch((err) => {
        setDeleting(false);
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
        navigate("/task-manager");
      });
  };

  return (
    <>
      <Navbar />
      <FlexCenter mt={5}>
        {task ? (
          <Card sx={{ width: phone ? "84%" : 580, p: phone ? 2 : 4 }}>
            <CardHeader
              title={`${task.title}`}
              subheader={`${dayjs(task.date).format("DD [of] MMM YYYY")}`}
              action={
                <Box>
                  <IconButton onClick={handleOpen} aria-controls="task-options">
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="task-options"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                  >
                    <MenuList sx={{ width: 150 }}>
                      <MenuItem onClick={() => navigate(`/tasks/${id}/edit`)}>
                        <ListItemIcon>
                          <Edit fontSize={phone ? "small" : "medium"} />{" "}
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={deleteTask} disabled={deleting}>
                        <ListItemIcon>
                          <Delete
                            color="error"
                            fontSize={phone ? "small" : "medium"}
                          />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography color="error">
                            {deleting ? "Deleting..." : "Delete"}
                          </Typography>
                        </ListItemText>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {task.desc}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </FlexCenter>
    </>
  );
}
