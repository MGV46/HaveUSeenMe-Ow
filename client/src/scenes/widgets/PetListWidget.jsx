import { Box,Button, Typography, useTheme } from "@mui/material";
import Pet from "components/Pet";
import WidgetWrapperPetsProfile from "components/WidgetWrapperPetsProfile";
import WidgetWrapperPetsProfile1 from "components/WidgetWrapperPetsProfile1";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPets } from "state";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FormPet from "./FormPet";
const PetListWidget = ({ userId }) => {
const [isRegister,setRegister] = useState(false);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const pets = useSelector((state) => state.pets);
 
  const { userId1 } = useParams();
  
const userFriend =useSelector((state)=> state.userFriend)
const user =useSelector((state)=> state.user)
console.log(user);
let isLog=userFriend==userId1;
console.log(userFriend+"owu");
console.log(userId1+"dfs");
console.log(isLog);
  const getPets = async () => {
    const response = await fetch(
      `http://localhost:3001/pets/${userId}/pets`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPets({ pets: data }));
  };

  useEffect(() => {
    getPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if(isRegister){
    return (
    
      <WidgetWrapperPetsProfile1 top={"50px"}  > 
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Pet List
        </Typography>
        <Box display="flex" flexDirection="column" gap="1.5rem"  marginBottom="1rem">
          {pets.map((pet) => (
            <Pet
              key={pet._id}
              petId2={pet._id}
              pName={`${pet.pName} `}
              subtitle={pet.specie}
              picturePath={pet.picturePath}
            />
          ))}
        </Box>
        
              <FormPet/>
        
        <Box display="flex" flexDirection="column" gap="1.5rem" top="10px">
        {isLog &&(
        <Button
            onClick={() => setRegister(isRegister => !isRegister)}
  
  
            
            sx={{
              color: "white",
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
          <Typography color={"white"}>Cancel</Typography>
          </Button>
        )}
        </Box>
        
      </WidgetWrapperPetsProfile1>
    );
  }else{
    return (
    
      <WidgetWrapperPetsProfile top={"50px"}  > 
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Pet List
        </Typography>
        <Box display="flex" flexDirection="column" gap="1.5rem"  marginBottom="1rem">
          {pets.map((pet) => (
            <Pet
              key={pet._id}
              petId2={pet._id}
              pName={`${pet.pName} `}
              subtitle={pet.specie}
              picturePath={pet.picturePath}
            />
          ))}
        </Box>
      
        <Box display="flex" flexDirection="column" gap="1.5rem" top="10px">
          {isLog &&(
            <Button
            onClick={() => setRegister(isRegister => !isRegister)}
  
  
            
            sx={{
              color: "white",
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
          <Typography color={"white"}>Create</Typography>
          </Button>
          )
          }
        
        </Box>
        
      </WidgetWrapperPetsProfile>
    );
  }
  
};

export default PetListWidget;
