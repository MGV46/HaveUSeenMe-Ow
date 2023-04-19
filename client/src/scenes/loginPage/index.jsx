import { Box, Typography, useTheme} from "@mui/material";
import Form from "./Form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="left"
      bgcolor={theme.palette.primary.main}
      minHeight="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        flex="1"
        p={{ xs: "1rem", sm: "2rem" }}
        maxWidth={{ xs: "100%", sm: "50%" }}
        bgcolor={theme.palette.primary.main}
      >
        <Typography
          fontWeight="bold"
          fontSize={{ xs: "6vw", sm: "4vw", md: "3vw", lg: "3.5vw" }}
          fontFamily="'Georgia', sans-serif"
          color={theme.palette.common.white}
          textAlign="left"
          mb="2rem"
        >
          Welcome to Husmow.
        </Typography>

        <Typography
          fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
          fontFamily="'Lato', sans-serif"
          color={theme.palette.common.white}
          mb="2rem"
          maxWidth="80%"
        >
          Husmow is a website that provides a platform to help pet owners find their lost pets quickly and easily. With a user-friendly interface, you can create a profile for your lost pet with detailed information, such as breed, age, and location. This information is then shared with other users in the area who can help keep an eye out for your beloved pet.
        </Typography>

      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex="1"
        p={{ xs: "1rem", sm: "2rem" }}
        maxWidth={{ xs: "100%", sm: "50%" }}
        bgcolor={theme.palette.background.default}
        ml={{ xs: "-10%", sm: "0" }}
      >
        <Typography
          fontWeight="bold"
          fontSize={{ xs: "6vw", sm: "4vw", md: "3vw", lg: "4vw" }}
          fontFamily="'Open Sans', sans-serif"
          color={theme.palette.primary.main}
          mb="2rem"
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Husmow
          </Link>
        </Typography>
        <Typography
          fontWeight="500"
          variant="h5"
          fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
          fontFamily="'Open Sans', sans-serif"
          color={theme.palette.text.primary}
          mb="2rem"
          textAlign="center"
          maxWidth="80%"
        >
          Welcome to Husmow, the Facebook for pets!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
