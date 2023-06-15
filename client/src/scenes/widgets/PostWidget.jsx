import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Verified,
  DeleteOutlined,
  MoreVertOutlined,
  Visibility
} from "@mui/icons-material";
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Divider, IconButton, Menu, MenuItem, Typography, useTheme, Icon } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import User from "components/User";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setUserPost } from "state";
import { useParams } from "react-router-dom";
import MyCommentWidget from "scenes/widgets/MyCommentWidget";
import CommentsWidget from "scenes/widgets/CommentsWidget";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { predecir } from "./predict";
import { Tooltip } from "@mui/material";


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
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const comment = useSelector((state) => state.comments);
  const handleNotification = (type) => {
    socket.emit("sendNotification", {
      senderName: user.firstName,
      receiverName: name2,
      type,
    });
  };
  
  const [isPicturePath1, setIsPicturePath] = useState(true);
  if (videoPath.length > 0) {
    isVideoPath = true;
  }
  if (picturePath.length > 0) {
    isPicturePath = true;
  }

  if (attachmentPath.length > 0) {
    isAttachment = true;
  }
  const isPicturePathRef = useRef(false);
  const temporizadorRef = useRef(null);
  const tiempoObjetivo = 1;
  const iniciarTemporizador = () => {
    temporizadorRef.current = setTimeout(() => {
      setIsPicturePath(true);
      reiniciarTemporizador();
    }, tiempoObjetivo * 1000);
  };

  const reiniciarTemporizador = () => {
    clearTimeout(temporizadorRef.current);
    temporizadorRef.current = null;
  };
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
  const Selection = () => {
    let f;
    const postId1 = posts.map((post) => {
      if (post._id === postId) {
        f = post._id;

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
    window.location.reload();
  };
  const cantComments = () => {


    let c = 0;
    for (let i = 0; i < comment.length; i++) {
      if (comment[i].postId == postId) {
        c++;
      }
    }
    return c;
  };
  const copiarLinkUser = () => {


    let url = `http://localhost:3000/profile/${postUserId}`;
    navigator.clipboard.writeText(url);
  };
  const copiarLink = () => {


    let url = `http://localhost:3000/postShare/${postId}`;
    navigator.clipboard.writeText(url);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (isPicturePath1) {
      setIsPicturePath(false);
    }
  }, [picturePath]);
  return (
    <WidgetWrapper m="1rem 0" onMouseEnter={iniciarTemporizador}
      onMouseLeave={reiniciarTemporizador}>
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
      <Box style={{ position: "relative", display: "inline-block" }} >
        {isPicturePath && (
          picturePath.map((picture) => (
            <div style={{ position: "relative", display: "inline-block",maxWidth:(picturePath.length>1?("15rem"):("auto")) }} >
              <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={`http://localhost:3001/assets/${picture}`}
              />
              {isPicturePath1 && predecir(picture) && (
                <Box
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "0.7rem",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer"
                  }}

                >

                  <Tooltip title="Verified image" placement="right" arrow>
                    <VerifiedIcon style={{ color: "purple", fontSize: "1.5rem" }} />
                  </Tooltip>

                </Box>
              )}

            </div>
          ))
        )}
      </Box>
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
            <IconButton
            >
              <ChatBubbleOutlineOutlined onClick={() => {
                Selection();
                navigate(`/PostShare/${postId}`);
                navigate(0);
              }



              }
              />
            </IconButton>
            <Typography>{cantComments()}</Typography>
          </FlexBetween>

        </FlexBetween>

        <IconButton onClick={handleClick}>
          <MoreVertOutlined />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          keepMounted
        >
          <MenuItem onClick={()=> {handleClose();
          copiarLink();}}>
            <IconButton zIndex="1">
              <ShareOutlined onClick={() => copiarLink()} />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={()=> {handleClose();
          copiarLinkUser();}}>
            <IconButton zIndex="1">
              <CoPresentIcon onClick={() => copiarLinkUser()} />
            </IconButton>
          </MenuItem>
          {isOwner && (
            <MenuItem onClick={()=> {handleClose();
              deletePost(true);}}>
              <IconButton onClick={() => deletePost(true)}>
                <DeleteOutlined />
              </IconButton>
            </MenuItem>
          )}
        </Menu>
      </FlexBetween>

      <Box mt="0.5rem">

        {isComments &&
          <Box >
            <Divider />
            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
              <CommentsWidget commentId={comments} postId={postId} />
              <Divider />
              <MyCommentWidget picturePath={userLog.picturePath} postId={postId} name2={name2} user={user} socket={socket} />
            </Typography>
          </Box>
        }

      </Box>

    </WidgetWrapper>
  );
};

export default PostWidget;