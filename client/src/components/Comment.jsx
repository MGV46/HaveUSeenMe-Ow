import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setComments } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';


const Comment = ({commentId, userId, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const comments = useSelector((state) => state.comments);
  
  const userLogin =useSelector((state)=> state.userLogin);
  let Id,description,userPicturePath,firstName,lastName;
  const commentsId = comments.map((comment) => {
    if (comment._id === commentId) {
      Id=comment.userId;
      firstName=comment.firstName;
      lastName=comment.lastName;
      userPicturePath=comment.userPicturePath;
      description=comment.description;
      return comment;
    };
    
  });
  
  
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  
  
    
  
   
  
  return (
    <Box
       display="flex"
       justifyContent="left"
       alignItems="left"
      // bgcolor={theme.palette.primary.main}
       >
 
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="40px" />
          <Box
            
            onClick={() => {
              navigate(`/profile/${Id}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h9"
              fontWeight="350"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName}{" " + lastName}
            </Typography>
            <Box
          >
            <Typography color={medium} fontSize={{ xs: "3vw", sm: "1.8vw", md: "1.3vw", lg: "1vw" }}>
              {description}
            </Typography>
            </Box>
            
          </Box>
        </FlexBetween>


     
      
      
      
   
    </Box>
  );
};

export default Comment;
