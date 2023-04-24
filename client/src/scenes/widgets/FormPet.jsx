import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import { setPets} from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  pName: yup.string().required("required"),
  specie: yup.string().required("required"),
  breed: yup.string().required("required"),
  gender: yup.string().required("required"),
  color: yup.string().required("required"),
  age: yup.number().required("required"),
  picture: yup.string().required("required"),
});



const initialValuesRegister = {
  pName: "",
  specie: "",
  breed: "",
  gender: "",
  color: "",
  age: "",
  picture: "",
};



const Form = () => {
  const [pageType, setPageType] = useState("register");
  const { palette } = useTheme();

  const dispatch = useDispatch();
    const  _id  = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const pets = useSelector((state) => state.pets);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const isRegister = pageType === "register";
  const patchPets = async () => {
    
    const response = await fetch(
      `http://localhost:3001/pets/${pets._id}`,
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
  };


  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    
    formData.append("picturePath", values.picture.name);
    console.log("user friends non-existent :(");
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("userId", _id._id);
    console.log(_id);
    
    console.log(values.picture.name);
    

    const savedUserResponse = await fetch(
      "http://localhost:3001/authP/registerPet",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedPet = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedPet) {
      navigate(`/profile/${_id._id}`);
      window.location.reload();

    }
  };

  

  const handleFormSubmit = async (values, onSubmitProps) => {
    
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pName}
                  name="pName"
                  error={
                    Boolean(touched.pName) && Boolean(errors.pName)
                  }
                  helperText={touched.pName && errors.pName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Specie"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.specie}
                  name="specie"
                  error={Boolean(touched.specie) && Boolean(errors.specie)}
                  helperText={touched.specie && errors.specie}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Breed"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.breed}
                  name="breed"
                  error={Boolean(touched.breed) && Boolean(errors.breed)}
                  helperText={touched.breed && errors.breed}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
              label="Gender"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.gender}
              name="gender"
              error={Boolean(touched.gender) && Boolean(errors.gender)}
              helperText={touched.gender && errors.gender}
              sx={{ gridColumn: "span 4" }}
            />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                 <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Color"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.color}
              name="color"
              error={Boolean(touched.color) && Boolean(errors.color)}
              helperText={touched.color && errors.color}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Age"
              
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.age}
              name="age"
              error={Boolean(touched.age) && Boolean(errors.ag)}
              helperText={touched.age && errors.age}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
             onClick={() => {
             
              
              register();
              patchPets();
              
            }}
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
             <Typography color={"white"}>Register</Typography>
            </Button>
            
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
