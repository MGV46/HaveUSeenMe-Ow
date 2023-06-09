import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPostsPets } from "state";
  
  const MyPostPetWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [image, setImage] = useState([]);
    const [video, setVideo] = useState([]);
    const [isAttachment, setIsAttachment] = useState(false);
    const [attachment, setAttachment] = useState([]);
    const [isAudio, setIsAudio] = useState(false);
    const [audio, setAudio] = useState(null);
    const [postPets, setPostPets] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const  petId = useSelector((state) => state.pets);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const petsId  = useSelector((state)=> state.pet);
    let Id;
    for(let i=0;i<petsId.length;i++){
      if(petsId[i]!=null){
       Id=petsId[i]._id;
      
      }
    }
  
    const handlePost = async () => {
     
      const formData = new FormData();
      formData.append("petId",Id);
      formData.append("userId", _id);
      formData.append("description", postPets);
      if (image) {
     
        image.map((image)=>(
  
          formData.append("picture", image),
          formData.append("picturePath", image.name)
          ))
        
      }
      if (video) {
        video.map((video)=>(
  
       
          formData.append("picture", video),
          formData.append("videoPath", video.name)
          ))
        
      }
      if (attachment) {
        attachment.map((attachment)=>(
  
       
          formData.append("picture", attachment),
          formData.append("attachmentPath", attachment.name)
          ))
        
      }
      
  
      const response = await fetch(`http://localhost:3001/postsPets`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const postsPets = await response.json();
      dispatch(setPostsPets({ postPets: postsPets.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }) }));
  
  
      dispatch(setPostsPets({ postsPets }));
      setImage(null);
      setVideo(null);
      setAttachment(null);
      setAudio(null);
      setPostPets("");
      window.location.reload();
    };
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="Upload something about your pet..."
            onChange={(e) => setPostPets(e.target.value)}
            value={postPets}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={true}
              onDrop={(acceptedFiles) => setImage(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      image.map((image)=>(
                      
                    
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                        ))
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
  
        {isVideo && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".mkv,.mp4"
              multiple={true}
              onDrop={(acceptedFiles) => setVideo(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!video ? (
                      <p>Add video Here</p>
                    ) : (
                      video.map((video)=>(
                        <FlexBetween>
                          <Typography>{video.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                        ))
                    )}
                  </Box>
                  {video && (
                    <IconButton
                      onClick={() => setVideo(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
        {isAttachment && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".pdf,.docx"
              multiple={true}
              onDrop={(acceptedFiles) => setAttachment(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!attachment ? (
                      <p>Add attach Here</p>
                    ) : (
                      attachment.map((attachment)=>(
                        <FlexBetween>
                          <Typography>{attachment.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                        ))
                    )}
                  </Box>
                  {attachment && (
                    <IconButton
                      onClick={() => setAttachment(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
              
        
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
          
          <FlexBetween gap="0.25rem" onClick={() => setIsVideo(!isVideo)}>
            <OndemandVideoIcon sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Video
            </Typography>
          </FlexBetween>
          
          
          <FlexBetween gap="0.25rem" onClick={() => setIsAttachment(!isAttachment)}>
            <AttachFileOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Attachment
            </Typography>
          </FlexBetween>
          {isNonMobileScreens ? (
            <>
  
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
  
          <Button
            disabled={!postPets}
            onClick={handlePost}
            sx={{
              color: "white",
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
          <Typography color={"white"}>Post</Typography>
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyPostPetWidget;
  