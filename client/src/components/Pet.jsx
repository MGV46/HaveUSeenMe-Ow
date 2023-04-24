import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPets ,setLoginPet} from "state";
import {setPet} from "state/auxiliar.js";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';


const Pet = ({ petId2, pName, subtitle, picturePath }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const tokenP = useSelector((state) => state.tokenP);
  const pets = useSelector((state) => state.pets);
  let Id;
  const petId = pets.map((pet) => {
    if (pet._id === petId2) {
      Id=pet._id;
      return pet;
    };
    
  });
  
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


 

  {/*const patchPet = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${petId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setPets({ pets: data }));
  };*/}
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} size="55px" />
        <Box
          onClick={() => {
            dispatch(
            setLoginPet({
              pet: petId,
              
            }));
           
            navigate(`/profilePet/${Id}`);
            
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
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
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      
    </FlexBetween>
  );
};

export default Pet;
