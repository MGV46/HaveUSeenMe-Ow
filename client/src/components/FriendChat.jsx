import { Button, Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";
import { useSelector } from "react-redux";


const Friend = ({ friendId, name, subtitle, userPicturePath, currentId, setCurrentChat, conversations }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const token = useSelector((state) => state.token);

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
  const register =()=>{
    let c=0;
    let b=true;
    
    for(let i=0;i<conversations.length;i++){
      
      if(conversations[i].members[1]==friendId){
        b=false;
      }
    }
    return b;
  };
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
      {register()?(
        console.log(register()),
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
      ):(
          <Typography color={"grey"}>Already exists</Typography>
      )

        
      }
      
        
      
      
    </FlexBetween >
  );
};

export default Friend;
