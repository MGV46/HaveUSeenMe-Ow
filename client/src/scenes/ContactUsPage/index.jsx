import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const ContactUsPage = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor={theme.palette.background.default}
      p={{ xs: "1rem", sm: "2rem" }}
    >
      <Typography
        fontWeight="bold"
        fontSize={{ xs: "6vw", sm: "4vw", md: "4vw", lg: "5vw" }}
        fontFamily="'Open Sans', sans-serif"
        color={theme.palette.primary.main}
        mb="5rem"
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Husmow
        </Link>
      </Typography>
      <Typography
        fontWeight="bold"
        fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.5vw" }}
        fontFamily="'Source Sans Pro', sans-serif"
        color={theme.palette.text.secondary}
        mb="1rem"
        textAlign="left"
        maxWidth="80%"
      >
        Contact Us
      </Typography>
      <Typography
        fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
        fontFamily="'Source Sans Pro', sans-serif"
        color={theme.palette.text.secondary}
        mb="2rem"
        textAlign="center"
        maxWidth="80%"
      >
       Have a question, comment, or suggestion? Get in touch with us!
      </Typography>

        <Typography
          fontWeight="bold"
          fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.5vw" }}
          fontFamily="'Source Sans Pro', sans-serif"
          color={theme.palette.text.secondary}
          mb="0.5rem"
          textAlign="left"
        >
          Email:
        </Typography>
        <Typography
          fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
          fontFamily="'Source Sans Pro', sans-serif"
          color={theme.palette.text.secondary}
          mb="1.5rem"
          textAlign="left"
        >
          support@husmow.com
        </Typography>
        <Typography
          fontWeight="bold"
          fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.5vw" }}
          fontFamily="'Source Sans Pro', sans-serif"
          color={theme.palette.text.secondary}
          mb="0.5rem"
          textAlign="left"
        >
          Phone:
        </Typography>
        <Typography
          fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
          fontFamily="'Source Sans Pro', sans-serif"
          color={theme.palette.text.secondary}
          mb="3.5rem"
          textAlign="left"
        >
          +591 (555) 555-55
        </Typography>

      <Box display="flex" justifyContent="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            fontFamily="'Open Sans', sans-serif"
            color={theme.palette.text.primary}
            textAlign="center"
            ml="1rem"
          >
            Home
          </Typography>
        </Link>
        <Link to="/terms" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            fontFamily="'Open Sans', sans-serif"
            color={theme.palette.text.primary}
            textAlign="center"
            ml="1rem"
          >
            Terms
          </Typography>
        </Link>
        <Link to="/help" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            fontFamily="'Open Sans', sans-serif"
            color={theme.palette.text.primary}
            textAlign="center"
            ml="1rem"
          >
            Help
          </Typography>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            fontFamily="'Open Sans', sans-serif"
            color={theme.palette.text.primary}
            textAlign="center"
            ml="1rem"
          >
            Contact Us
          </Typography>

        </Link>
      </Box>
    </Box>
  );
};
export default ContactUsPage;
