import { Box } from "@mui/material";//estas dos son herramientas, importante para la etiqueta, box es el tipo de etiqueta
import { styled } from "@mui/system";//esta ayuda a darle el estilo correspondiente a la pagina

const WidgetWrapper = styled(Box)(({ theme }) => ({// aqui estamos diciendo que el estilo del contenedor saldra del theme.js
 
  position: "sticky",//esto hace que no baje esta ventana a menos que usemos su scroll
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",// margen que tienen los objetos dentro del contenedor
  backgroundColor: theme.palette.background.alt,//color del contenedor
  borderRadius: "1rem",// este se refiere al radio de los bordes del contenedor
  top:"128px",//margen hacia arriba para el bloque de la informacion y amigos de la pagina de perfil del usuario
  height: "40rem",//dependiendo de la resolucion de la pantalla el alto de esta etiqueta variara, esto es importante para el scroll, sino este no tendria scroll
  overflow: "auto",//scroll automatico, osea en el eje en que se necesite el scroll habra el mismo
  
}));

export default WidgetWrapper;