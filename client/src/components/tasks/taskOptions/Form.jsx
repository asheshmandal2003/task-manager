import { Button, FormControl, Stack, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingBtn from "../../partials/LoadingBtn";
import dayjs from "dayjs";

export default function Form({
  phone,
  onSubmit,
  btnText,
  btnIcon,
  condition,
}) {
  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      date: dayjs(Date.now()),
    },
    onSubmit: onSubmit,
    validationSchema: yup.object({
      title: yup
        .string()
        .min(3, "Title can have minimum 3 characters!")
        .max(40, "Title can have maximum 40 characters!")
        .required("Task title cannot be balnked!"),
      desc: yup
        .string()
        .max(1500, "Task description can have maximum 1500 characters")
        .nullable(),
      date: yup
        .string("Date should be in string format")
        .required("Date cannot be blanked!"),
    }),
  });
  return (
    <>
      <Stack
        spacing={phone ? 3 : 4}
        width="100%"
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <FormControl>
          <TextField
            fullWidth
            autoFocus
            id="title"
            name="title"
            label="Title"
            size={phone ? "small" : "medium"}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              Boolean(formik.touched.title) && Boolean(formik.errors.title)
            }
            helperText={Boolean(formik.touched.title) && formik.errors.title}
          />
        </FormControl>
        <FormControl>
          <TextField
            fullWidth
            multiline
            rows={3}
            id="desc"
            name="desc"
            label="Description"
            size={phone ? "small" : "medium"}
            value={formik.values.desc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.desc) && Boolean(formik.errors.desc)}
            helperText={Boolean(formik.touched.desc) && formik.errors.desc}
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              name="date"
              label="Controlled picker"
              value={formik.values.date}
              onChange={(newValue) => formik.setFieldValue("date", newValue.$d)}
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.touched.date) && Boolean(formik.errors.date)
              }
              helperText={Boolean(formik.touched.date) && formik.errors.date}
              sx={{ width: "100%" }}
            />
          </DemoContainer>
        </LocalizationProvider>
        {condition ? (
          <LoadingBtn btnText={btnText} pos="end" endIcon={btnIcon} />
        ) : (
          <Button variant="contained" endIcon={btnIcon} type="submit">
            {btnText}
          </Button>
        )}
      </Stack>
    </>
  );
}
