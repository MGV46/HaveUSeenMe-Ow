import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyPostPetWidget from "scenes/widgets/MyPostPetWidget";
import PetWidgetProfile from "scenes/widgets/PetWidgetProfile";
import Navbar from "scenes/navbar";
import {getPet} from "state/auxiliar.js";

import PostsPetsWidget from "scenes/widgets/PostsPetsWidget";
//import PetWidgetProfile from "scenes/widgets/PetWidgetProfile";

const ProfilePagePet = () => {
  
  const [petd, setPet] = useState(null);
  const pets=useSelector((state)=>state.pets)
  const petsId  = useSelector((state)=> state.pet);
  const users = useSelector((state) => state.user);
  let Id,picturePath;
  
  //const user= users.find(petId.userId);
for(let i=0;i<petsId.length;i++){
  if(petsId[i]!=null){
   Id=petsId[i]._id;
   picturePath=petsId[i].picturePath;
  }
}
 


  const token = useSelector((state) => state.token);//
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getPets = async () => {
    const response = await fetch(`http://localhost:3001/pets/${Id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setPet(data);
  };

  useEffect(() => {
    getPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  
  
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
          <PetWidgetProfile petId={Id} picturePath={picturePath} />
{/*se quito aqui lo de los posts desde el perfil */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          
          <MyPostPetWidget picturePath={users.picturePath} />
          <Box m="2rem 0" />
          <PostsPetsWidget userId={users._id} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePagePet;
