import { Add } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { FlexCenter } from "../partials/FlexCenter";

export default function TasksTable() {
  const phone = useMediaQuery("(max-width:700px)");
  const [tasks, setTasks] = useState(null);
  const token = useSelector((state) => state.token);

  async function fetchTasks() {
    await axios
      .get(`${import.meta.env.VITE_API_GATEWAY_URL}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTasks(res.data.allTasks);
      })
      .catch((err) => {
        console.log(err.status);
        toast.error("Cannot able to fetch tasks!", {
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

  useEffect(() => {
    fetchTasks();
  }, []);
  const navigate = useNavigate();
  return tasks ? (
    tasks.length === 0 ? (
      <FlexCenter
        flexDirection="column"
        alignItems="center"
        sx={{ width: phone ? "88%" : 580 }}
      >
        <Alert severity="info" sx={{width: "100%", mb: 3}}>No tasks are available!</Alert>
        <Button
          variant="outlined"
          endIcon={<Add />}
          onClick={() => navigate("/tasks/new")}
        >
          Add Task
        </Button>
      </FlexCenter>
    ) : (
      <Box sx={{ width: phone ? "88%" : 580 }}>
        <Button
          variant="outlined"
          endIcon={<Add />}
          onClick={() => navigate("/tasks/new")}
        >
          Add Task
        </Button>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                return (
                  <TableRow key={task.taskId}>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/tasks/${task.taskId}`)}
                    >
                      {task.title}
                    </TableCell>
                    <TableCell align="right">
                      {dayjs(task.date).format("DD [of] MMM YYYY")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  ) : (
    <Typography>Loading...</Typography>
  );
}
