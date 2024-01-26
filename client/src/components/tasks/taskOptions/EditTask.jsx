import { Card, Typography, useMediaQuery } from "@mui/material";
import { FlexCenter } from "../../partials/FlexCenter";
import Navbar from "../../partials/Navbar";
import Form from "./Form";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function EditTask() {
  const [updating, setUpdating] = useState(false);
  const token = useSelector((state) => state.token);
  const { id } = useParams();
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:700px)");

  const createTask = async (values) => {
    setUpdating(true);
    const formdata = new FormData();
    for (let value in values) {
      formdata.append(value, values[value]);
    }
    await axios({
      method: "PUT",
      url: `${import.meta.env.VITE_API_GATEWAY_URL}/${id}`,
      data: formdata,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        setUpdating(false);
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
        navigate(`/tasks/${id}`);
      })
      .catch((err) => {
        setUpdating(false);
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
  };
  return (
    <>
      <Navbar />
      <FlexCenter mt={5}>
        <Card sx={{ width: phone ? "84%" : 480, p: phone ? 2 : 4 }}>
          <FlexCenter flexDirection="column" alignItems="center">
            <Typography mb={4} variant="h6">
              Edit Task
            </Typography>
            <Form
              phone={phone}
              btnText="Edit"
              btnIcon={<Edit />}
              onSubmit={createTask}
              condition={updating}
            />
          </FlexCenter>
        </Card>
      </FlexCenter>
    </>
  );
}
