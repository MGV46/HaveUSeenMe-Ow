import { Button,Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";
import { useSelector } from "react-redux";


const Friend = ({ friendId, name, subtitle, userPicturePath, currentId, setCurrentChat }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const token = useSelector((state) => state.token);
  //const findChatId = conversations.find((_id) => )


  const handleClick2 = async () => {
    const formData = new FormData();
    formData.append("currentId", currentId);
    formData.append("friendId", friendId);

    const response = await fetch(`http://localhost:3001/conversations`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const conversations = await response.json();
    //    setPosts({ conversation: conversations.data });
    window.location.reload(false);


  }
  const handleClick = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/conversations/find/${currentId}/${friendId}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
//64500cdae701e0d55607f4aa
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box onClick={() => handleClick()}>
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
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <Button
        onClick={() => handleClick2()}
        sx={{
          color: "white",
          backgroundColor: palette.primary.main,
          borderRadius: "3rem",
        }}
      >
        <Typography color={"white"}>Start</Typography>
      </Button>
    </FlexBetween>
  );
};

export default Friend;
