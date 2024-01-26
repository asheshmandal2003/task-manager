import { Box } from "@mui/material";
import Navbar from "../partials/Navbar";
import TasksTable from "../tasks/TasksTable";
import { FlexCenter } from "../partials/FlexCenter";

export default function Home() {
  return (
    <>
      <Navbar />
      <FlexCenter mt={5}>
        <TasksTable />
      </FlexCenter>
    </>
  );
}
