import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
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
        What is Husmow?
      </Typography>
      <Typography
        fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
        fontFamily="'Source Sans Pro', sans-serif"
        color={theme.palette.text.secondary}
        mb="3rem"
        textAlign="center"
        maxWidth="80%"
      >
       Husmow is a platform dedicated to reuniting lost pets with their owners. Our goal is to make the process of finding and connecting with missing pets as easy as possible. We believe that pets are important members of our families, and we're committed to helping owners and pets get back together quickly and safely.
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
        Why is Husmow?
      </Typography>
      <Typography
        fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
        fontFamily="'Source Sans Pro', sans-serif"
        color={theme.palette.text.secondary}
        mb="7rem"
        textAlign="center"
        maxWidth="80%"
      >
       Because it is an acronym for "Have U Seen Me-ow?" And because we tought it was funny.
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

export default AboutUsPage;

