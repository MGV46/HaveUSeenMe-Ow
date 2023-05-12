import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Verified,
  DeleteOutlined,
  MoreVertOutlined 
} from "@mui/icons-material";
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Divider, IconButton,Menu, MenuItem, Typography, useTheme, Icon } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import User from "components/User";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setUserPost } from "state";
import { useParams } from "react-router-dom";
import MyCommentWidget from "scenes/widgets/MyCommentWidget";
import CommentsWidget from "scenes/widgets/CommentsWidget";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import CoPresentIcon from '@mui/icons-material/CoPresent';
const PostWidget = ({
  postId,
  postUserId,
  name,
  name2,
  description,
  location,
  picturePath,
  videoPath,
  attachmentPath,
  userPicturePath,
  likes,
  comments,
  verificate,
  createdAt,
  socket,
  user,
}) => {
  const [isComments, setIsComments] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const { userId } = useParams();
  const userLog = useSelector((state) => state.userLogin);
  let isLog = userLog._id != postUserId;
  let isReg = userId != postUserId;
  const posts = useSelector((state) => state.posts);
  let isVideoPath = false, isPicturePath = false, isAudioPath = false, isAttachment = false;
  const theme = useTheme();
  const isOwner = postUserId === loggedInUserId;//Add isOwner, so the button just appears to the owner 
  const timePosts = format(createdAt);

  if(videoPath.length>0){
    isVideoPath=true;
  }
  if (picturePath.length > 0) {
    isPicturePath = true;
  }

  if (attachmentPath.length > 0) {
    isAttachment = true;
  }
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  const Selection =()=>{
  let f;
  const postId1 = posts.map((post) => {
    if (post._id === postId) {
      f=post._id;
      
      return post;
    }
    
  });
    dispatch(setUserPost({ post: postId1 }));
  }
   
  const deletePost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const deletedPost = await response.json();
      // Dispatch an action to update the state with the deleted post
      dispatch(setPost({ post: deletedPost }));
    } catch (error) {
      console.error(error);
    }
   
  };
  const cantComments=()=>{

  
  return (
    <WidgetWrapper m="1rem 0">
      <Box>
        {(isLog && isReg) ? (<Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          subtitle2={timePosts}
          userPicturePath={userPicturePath}

        />) : (<User
          friendId={postUserId}
          name={name}
          subtitle={location}
          subtitle2={timePosts}
          userPicturePath={userPicturePath}

        />)

        }
        {
          verificate && (
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginRight: "10px" }}
                color={"#7b12b0"}
                variant="h9"
                fontWeight="500"


              >
                Post Verified
              </Typography>

              <VerifiedIcon color="purple" fontSize="0.9rem" />

            </Box>




          )
        }
      </Box>

      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {isAttachment && (
        attachmentPath.map((attachmentPath) => (
          <a
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}

            href={`http://localhost:3001/assets/${attachmentPath}`}// aqui le estoy diciendo a la etiqueta que sera un link, y le digo donde esta lo que dbe de descargar
            download={"file.pdf"}//esto es para que no se habra un documento pdf, en la misma ventana que la pagina
            target="_blank"

          >{attachmentPath}<br></br></a>
        ))
      )}
      {isPicturePath && (
        picturePath.map((picture) => (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picture}`}
          />

        ))


      )}


      {isVideoPath && (
        videoPath.map((videoPath) => (
          <video
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${videoPath}`}
            controls
          />))
      )}


      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>

              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined onClick={() => handleNotification(1)} />
              )}

            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={
             Selection()}>
              <ChatBubbleOutlineOutlined  onClick={
               
               ()=>setIsComments(!isComments) 
             
               } 
               />
            </IconButton>
           
          </FlexBetween>
          {isOwner && (
            <IconButton onClick={() => deletePost(true)}>
              <DeleteOutlined />
            </IconButton>
          )}
        </FlexBetween>

        <IconButton zIndex="1">
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      <Box mt="0.5rem">

        {isComments &&
          <Box >
            <Divider />
            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
              <CommentsWidget commentId={comments} postId={postId} />
              <Divider />
              <MyCommentWidget picturePath={userLog.picturePath} postId={postId} name2={name2} user={user} socket={socket}/>
            </Typography>
          </Box>
        }

      </Box>

    </WidgetWrapper>
  );
};

export default PostWidget;