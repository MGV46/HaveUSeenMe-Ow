import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
 
  position: "sticky",
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "1rem",
  top:"113px",
  height: "40rem",
  overflow: "auto",
  
}));

export default WidgetWrapper;