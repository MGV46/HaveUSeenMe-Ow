import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import User from "components/User";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
 
  const PostPetWidget = ({
    postId,
    postPetId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    videoPath,
    audioPath,
    attachmentPath,
    userPicturePath,
    
  }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
   const userLog = useSelector((state) => state.userLogin);
  let isLog=userLog._id!=postUserId;
  console.log(isLog);
  let isVideoPath=false,isPicturePath=false,isAudioPath=false,isAttachment=false;
  if(videoPath.length>0){
    isVideoPath=true;
  }
  if(picturePath.length>0){
    isPicturePath=true;
  }
  
  if(attachmentPath.length>0){
    isAttachment=true;
  }
    
    return (
      <WidgetWrapper m="1rem 0">
        {isLog?(<Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />):(<User
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />)

        }
        
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {isAttachment && (
        <h5
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${attachmentPath}`}
          href={`http://localhost:3001/assets/${attachmentPath}`}// aqui le estoy diciendo a la etiqueta que sera un link, y le digo donde esta lo que dbe de descargar
          download={"file.pdf"}//esto es para que no se habra un documento pdf, en la misma ventana que la pagina
          target="_blank"
        >{attachmentPath}</h5>   
      )}
      {isPicturePath && (
        picturePath.map((picture)=>(
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
        <video
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${videoPath}`}
          controls
        />   
      )}
      
       
      </WidgetWrapper>
    );
  };
  
  export default PostPetWidget;