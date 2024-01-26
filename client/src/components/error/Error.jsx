import { Box, Button, Card, Typography, useMediaQuery } from "@mui/material";
import { FlexCenter } from "../partials/FlexCenter";
import Navbar from "../partials/Navbar";
import { Warning } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:700px)");
  return (
    <>
      <Navbar />
      <FlexCenter>
        <Card sx={{ width: phone ? "84%" : 580, p: phone ? 2 : 4, mt: 5 }}>
          <FlexCenter alignItems="center" flexDirection="column">
            <Box display="flex">
              <Warning
                sx={{ mr: 1 }}
                color="warning"
                fontSize={phone ? "medium" : "large"}
              />
              <Typography variant={phone ? "h5" : "h4"} mb={3}>
                404 Not Found
              </Typography>
            </Box>
            <Button
              variant="contained"
              size={phone ? "small" : "medium"}
              onClick={() => navigate("/task-manager")}
            >
              Back to homepage
            </Button>
          </FlexCenter>
        </Card>
      </FlexCenter>
    </>
  );
}
