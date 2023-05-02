import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const HelpPage = () => {
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
                Frequently Asked Questions
            </Typography>
            <Typography
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="3rem"
                textAlign="center"
                maxWidth="80%"
            >
                Here are some common questions and answers that may be helpful to you.
            </Typography>

            <Typography
                fontWeight="bold"
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.5vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="1rem"
                textAlign="left"
                maxWidth="80%">
                Q: How do I report a lost pet?
            </Typography>
            <Typography
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="3rem"
                textAlign="center"
                maxWidth="80%">
                A: To report a lost pet, go to the main page and fill
                out the form with your pet's information and a photo if possible.
                Your report will be added to our database and shared with other
                members of the community.
            </Typography>

            <Typography
                fontWeight="bold"
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.5vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="1rem"
                textAlign="left"
                maxWidth="80%">
                Q: How do I search for a lost pet?
            </Typography>
            <Typography
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="3rem"
                textAlign="center"
                maxWidth="80%">
                A: To search for a lost pet, you can see all user's posts 
                in the main page, and soon the location and date filters will be available.
            </Typography>

            <Typography
                fontWeight="bold"
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.5vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="1rem"
                textAlign="left"
                maxWidth="80%">
                Q: What should I do if I find a lost pet?
            </Typography>
            <Typography
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="3rem"
                textAlign="center"
                maxWidth="80%">
                A: If you find a lost pet, you can report it on our website and
                upload a photo if possible. If you are unable to
                locate the owner, you can contact your local animal control or
                humane society for assistance.
            </Typography>
        {/*<Typography
                fontWeight="bold"
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.5vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="1rem"
                textAlign="left"
                maxWidth="80%">
                Q: How can I update my lost pet report?
            </Typography>
            <Typography
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="3rem"
                textAlign="center"
                maxWidth="80%">
                A: To update your lost pet report, go to the "My Reports" page and
                select the report you want to update. From there, you can edit the
                information or add a new photo. If you have found your pet, please
                mark the report as "resolved" to let others know that your pet has
                been found. 
    </Typography>*/}

            <Typography
                fontWeight="bold"
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.5vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="1rem"
                textAlign="left"
                maxWidth="80%">
                Q: How can I delete my lost pet report?
            </Typography>
            <Typography
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="3rem"
                textAlign="center"
                maxWidth="80%">
                A: To delete your lost pet report, go to your profile page and
                select the report you want to delete. From there, click the "Delete"
                button to confirm that you want to delete the report. Note that once
                a report is deleted, it cannot be recovered.
            </Typography>

            <Typography
                fontWeight="bold"
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.5vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="1rem"
                textAlign="left"
                maxWidth="80%">
                Q: How can I contact Husmow for support?
            </Typography>
            <Typography
                fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1.2vw" }}
                fontFamily="'Source Sans Pro', sans-serif"
                color={theme.palette.text.secondary}
                mb="3rem"
                textAlign="center"
                maxWidth="80%">
                A: You can contact our support team by sending an email to
                support@husmow.com or by filling out the contact form on the "Contact Us" page.
                We aim to respond to all inquiries within 24 hours.
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

export default HelpPage;