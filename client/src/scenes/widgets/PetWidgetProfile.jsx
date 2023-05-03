import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import PetsIcon from '@mui/icons-material/Pets';
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapperProfilePet from "components/WidgetWrapperProfilePet";
//import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Friend from "components/Friend";
const UserWidget = ({ petIds, ppicturePath }) => {
  const [petl, setPet] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const pets = useSelector((state) => state.pets);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const users = useSelector((state) => state.user);
  const petsId  = useSelector((state)=> state.pet);
  

  let pName,specie,breed,gender,color,age,picturePath,petId,userId;
  for(let i=0;i<petsId.length;i++){
    if(petsId[i]!=null){
     petId=petsId[i]._id;
     picturePath=petsId[i].picturePath;
     pName=petsId[i].pName;
     specie=petsId[i].specie;
     breed=petsId[i].breed;
     gender=petsId[i].gender;
     color=petsId[i].color;
     age=petsId[i].age;
     userId=petsId[i].userId;
    }
  }

  const isUser=userId==users._id;

  
  //const user= users.find(petId.userId);

  const getPet = async () => {
    const response = await fetch(`http://localhost:3001/users/${petId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setPet(data);
  };

  useEffect(() => {
    getPet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

 
  
 

  return (
    

   
    <WidgetWrapperProfilePet className="h3">
      {/* FIRST ROW */}
      <FlexBetween 
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profilePet/${petId}`)}
      >
        <FlexBetween gap="1rem"  >
          <UserImage image={picturePath} />
          <Box >
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {pName} 
            </Typography>
            
          </Box>
        </FlexBetween>
        {isUser &&(
          <ManageAccountsOutlined />
        )
          
        }
        
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PetsIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Specie:</Typography>
          <Typography color={medium}>{specie}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <PetsIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Breed:</Typography>
          <Typography color={medium}>{breed}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <PetsIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Age:</Typography>
          <Typography color={medium}>{age}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          
          <Typography color={medium}>Gender:</Typography>
          <Typography color={main} fontWeight="500">
            {gender}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Color:</Typography>
          <Typography color={main} fontWeight="500">
            {color}
          </Typography>
        </FlexBetween>
      </Box>
      
      {/* FOURTH ROW
      <Divider /> 
      <Typography color={medium}>Owner:</Typography>
      {users.map((user) => (
          <Friend
            key={user._id}
            friendId={user._id}
            name={`${user.firstName} ${user.lastName}`}
            subtitle={user.occupation}
            userPicturePath={user.picturePath}
          />
        ))}*/}
      

      
         </WidgetWrapperProfilePet >
  
  );
};

export default UserWidget;
