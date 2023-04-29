import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    TextField,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setComments, setComment } from "state";
  import { useNavigate } from "react-router-dom";
  const MyCommentWidget = ({ picturePath,postId }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [isAttachment, setIsAttachment] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const [isAudio, setIsAudio] = useState(false);
    const [audio, setAudio] = useState(null);
    const [comment, setComment] = useState("");
    const { palette } = useTheme();
    const  _id  = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const navigate = useNavigate();
    
    const main = palette.neutral.main;
   
  
    const handlePost = async () => {
        console.log(postId)
      const formData = new FormData();
      formData.append("userId", _id._id);
      formData.append("postId",postId)
      formData.append("description", comment);
      const response = await fetch(`http://localhost:3001/comments`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const comments = await response.json();
      
      dispatch(setComments({ comments: comments}));
  
  
      dispatch(setComments({ comments }));
      
      setComment("");
      //window.location.reload();
    };
  
    return (
      <WidgetWrapper>
      
        
        
        <Box mt="0.5rem">
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Box style={{
            padding: "0.5rem ",
          }}>
            
          <Button disabled={!comment}
            onClick={handlePost}
            sx={{
              color: "white",
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
             >{/*/I added an onClick handler to the Button that triggers the addComment function, which submits the comment to the backend and updates the post state. We also set isCommentBoxOpen back to false to close the comment. box */}
            <Typography color={"white"}>Add</Typography>
          </Button>
          </Box>
         
        </Box>
          
         
         
  
          
        
       
      </WidgetWrapper>
    );
  };
  
  export default MyCommentWidget;
  