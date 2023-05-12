import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostWidgetShare from "scenes/widgets/PostWidgetShare";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import FriendListWidgetShare from "scenes/widgets/FriendListShare";
const PostShare = () => {
  const user=useSelector((state)=>state.user);
  //const { userId } = useParams();
//  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
const userLogin =useSelector((state)=> state.userLogin);
const post=useSelector((state)=>state.post);
console.log(post);
let postId;
for(let i=0;i<post.length;i++){
    if(post[i]!=null){
        postId=post[i];
    }
}
//let isLog=userLogin._id==userId;

  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/postShare/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };


  useEffect(() => {
    getPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
console.log(user)
  if (!user) return null;
  //const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);


  
 

  return (
    <Box >
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined} >
      
          <UserWidget userId={user._id} picturePath={user.picturePath} />
{/*se quito aqui lo de los posts desde el perfil */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
         
         {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          videoPath,
          audioPath,
          attachmentPath,
          userPicturePath,
          likes,
          comments,
          verificate,
  createdAt,
        }) => (
          (postId._id==_id?(
            
<PostWidgetShare
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            videoPath={videoPath}
            audioPath={audioPath}
            attachmentPath={attachmentPath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            verificate={verificate}
            createdAt={createdAt}
          />
          ):(
<></>
          )

          )
          
        )
      )}
        </Box>
        <Box flexBasis="26%">
      
        {isNonMobileScreens && (
          <Box flexBasis="26%">
           <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidgetShare userId={user._id} />
          </Box>
        )} 
        </Box>
        
        
      </Box>
      
            
    </Box>
  );
};

export default PostShare;
