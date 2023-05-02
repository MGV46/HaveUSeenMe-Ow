import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const TermsPage = () => {
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
                mb="1rem"
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
                Terms and Conditions
            </Typography>
            <Typography
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="3rem"
                textAlign="center"
                maxWidth="80%"
            >
                By using Husmow, you agree to the following terms and conditions:
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
                Privacy Policy
            </Typography>
            <Typography
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="3rem"
                textAlign="center"
                maxWidth="80%"
            >
                Husmow is committed to protecting your privacy. We will not share your personal information with third parties without your consent.
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
                Limitation of Liability
            </Typography>
            <Typography
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="3rem"
                textAlign="center"
                maxWidth="80%"
            >
                Husmow is not responsible for any damages or losses that may result from the use of our website or services. We do not guarantee the accuracy or completeness of the information provided on our website, and we are not responsible for any errors or omissions in that information.

                Furthermore, Husmow is not responsible for any damages or losses that may result from the actions of third parties, including but not limited to other users of our website or services, or from events beyond our control such as natural disasters, power outages, or other disruptions.

                By using our website or services, you agree to hold Husmow harmless from any and all claims, damages, losses, liabilities, costs, and expenses (including without limitation reasonable attorneys’ fees) arising out of or in any way connected with your use of our website or services, your violation of these Terms of Service, or your violation of any rights of another person or entity.
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
                <Link to="/about" style={{ textDecoration: "none" }}>
                    <Typography
                        variant="h6"
                        fontFamily="'Open Sans', sans-serif"
                        color={theme.palette.text.primary}
                        textAlign="center"
                        ml="1rem"
                    >
                        About Us
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

export default TermsPage;