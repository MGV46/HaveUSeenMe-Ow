import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapperPetsProfile1 = styled(Box)(({ theme }) => ({
    
  position: "sticky",
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "1rem",
  top:"128px",
  height: "36rem",//dependiendo de la resolucion de la pantalla el alto de esta etiqueta variara, esto es importante para el scroll, sino este no tendria scroll
  overflow: "auto",//scroll automatico, osea en el eje en que se necesite el scroll habra el mismo
}));

export default WidgetWrapperPetsProfile1;