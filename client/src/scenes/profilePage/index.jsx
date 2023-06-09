import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";

import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidgetProfile from "scenes/widgets/UserWidgetProfile";
import PetListWidget from "scenes/widgets/PetListWidget";
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
const userLogin =useSelector((state)=> state.userLogin);

let isLog=userLogin._id==userId;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

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
      
          <UserWidgetProfile userId={userId} picturePath={user.picturePath} />
{/*se quito aqui lo de los posts desde el perfil */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
         {isLog && 
          <MyPostWidget picturePath={user.picturePath} />}
          <PostsWidget userId={userId} isProfile />
        </Box>
        <Box flexBasis="26%">
      
       <PetListWidget userId={userId} />
      
       
        </Box>
        
        
      </Box>
      
            
    </Box>
  );
};

export default ProfilePage;
