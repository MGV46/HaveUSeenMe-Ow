import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';


const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const userLogin =useSelector((state)=> state.userLogin);
  const isFriend = friends.find((friend) => friend._id === friendId);
  let isfri=true,d=true;
    for(let i=0;i<userLogin.friends.length;i++){
      if(userLogin.friends[i]==friendId){
        isfri=false;
       
      }
    }
    
  
<<<<<<< HEAD
  console.log("hdfhahdfsahfd: "+friendId);
  console.log("nothings gonna: "+userLogin._id);
=======
  
>>>>>>> c7b73f68485121704f8187a7cb6e2634971a91f7
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    
  
   
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
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
      {friendId!=userLogin._id ?
      (
      <IconButton
      onClick={() => patchFriend()}
      sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
    >
      {isfri ? (
        <GroupAddIcon sx={{ color: primaryDark }} />
        
      ) : (
        <GroupRemoveIcon sx={{ color: primaryDark }} />
      )}
    </IconButton>
      ):(
        <Box color= {palette.primary.light}  >YOU</Box>
      )
     }
      
    </FlexBetween>
  );
};

export default Friend;
