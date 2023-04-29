import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import Comment from "components/Comment";
  import User from "components/User";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  import { useParams } from "react-router-dom";
  import MyCommentWidget from "scenes/widgets/MyCommentWidget";
  const CommentWidget = ({
    commentId,
    userId,
    postId,
    name,
    description,
    
    userPicturePath,
    repostId
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
   
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    //const { userId } = useParams();
    const userLog = useSelector((state) => state.userLogin);
    //let isLog=userLog._id!=postUserId;
   // let isReg=userId!=postUserId;
    //let id;
    const comments = useSelector((state) => state.comments);
  
  
    
     
   
    return (
      <WidgetWrapper m="1rem 0">
        {comments.postId==repostId &&
                <Comment
              
                key={commentId}
            commentId={commentId}
            userId={userLog._id}
            postId={postId}
          />

                }
        
        
      </WidgetWrapper>
    );
  };
  
  export default CommentWidget;