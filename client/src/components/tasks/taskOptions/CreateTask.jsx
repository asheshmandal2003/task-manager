import { Card, Typography, useMediaQuery } from "@mui/material";
import { FlexCenter } from "../../partials/FlexCenter";
import Navbar from "../../partials/Navbar";
import Form from "./Form";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function CreateTask() {
  const [creating, setCreating] = useState(false);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:700px)");

  const createTask = async (values) => {
    setCreating(true);
    const formdata = new FormData();
    formdata.append("taskId", uuidv4());
    for (let value in values) {
      formdata.append(value, values[value]);
    }
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_GATEWAY_URL}`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setCreating(false);
        toast.success(`Task Created!`, {
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
        setCreating(false);
        toast.error(`${err.message.data.message}`, {
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
  };
  return (
    <>
      <Navbar />
      <FlexCenter mt={5}>
        <Card sx={{ width: phone ? "84%" : 480, p: phone ? 2 : 4 }}>
          <FlexCenter flexDirection="column" alignItems="center">
            <Typography mb={4} variant="h6">
              Create Task
            </Typography>
            <Form
              phone={phone}
              btnText="Add"
              btnIcon={<Add />}
              onSubmit={createTask}
              condition={creating}
            />
          </FlexCenter>
        </Card>
      </FlexCenter>
    </>
  );
}
