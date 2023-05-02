import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import { Box, Typography, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";



export default function Conversation({ conversation, currentUser }) {
  const { palette } = useTheme();
  const [user, setUser] = useState((null));
  const main = palette.neutral.main;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:3001/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <FlexBetween >
      <FlexBetween gap="1rem">
        <UserImage image={user?.picturePath} size="55px" />
        <Box>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
}
