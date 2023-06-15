import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  WindowSharp,
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
import { setaiAunt,setAi, setPosts,setMode1 } from "state";
import { predecir } from "./predict";
import { v4 as uuidv4 } from "uuid";
const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [isAttachment, setIsAttachment] = useState(false);
  const [attachment, setAttachment] = useState([]);
  const [isAudio, setIsAudio] = useState(false);

  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const ima=useSelector((state)=>state.ai);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  

 
  
  let cons =0;

 

  const handlePost = async () => {

      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
     
      if (image.length > 0) {
      image.forEach((file) => {
        const timestamp = Date.now();
        const randomString = uuidv4();
        const modifiedFile1 = new File([file], `${timestamp}${randomString}${file.name}`, {
          type: file.type,
          lastModified: file.lastModified,
        });
        formData.append("picture", modifiedFile1);
        formData.append("picturePath", modifiedFile1.name);
      });
    }
      if (video.length > 0) {
        video.map((video) => (
          formData.append("picture", video),
          formData.append("videoPath", video.name)
        ));
      }
      if (attachment.length > 0) {
        attachment.map((attachment) => (
          formData.append("picture", attachment),
          formData.append("attachmentPath", attachment.name)
        ));
      }

      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(
        setPosts({
          post: posts.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          }),
        })
      );

      dispatch(setPosts({ posts }));

      setImage([]);
      setVideo([]);
      setAttachment([]);
     
     
      setPost("");
      dispatch(setMode1());
    
  
};
  
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
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
                  {image.length==0 ? (
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
                {image.length>0  && (
                  <IconButton
                    onClick={() => setImage([])}
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
                  {video.length==0 ? (
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
                {video.length>0 && (
                  <IconButton
                    onClick={() => setVideo([])}
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
                  {attachment.length==0 ? (
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
                {attachment.length>0 && (
                  <IconButton
                    onClick={() => setAttachment([])}
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
          <ImageOutlined sx={{ color: mediumMain }} onClick={() => setImage([])}/>
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            onClick={() => {
              
              setImage([]);
            }
              
              }
          >
            Image
          </Typography>
        </FlexBetween>
        
        <FlexBetween gap="0.25rem" onClick={() => setIsVideo(!isVideo)}  >
          <OndemandVideoIcon sx={{ color: mediumMain }} onClick={() => setVideo([])}/>
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            onClick={() => setVideo([])}
          >
            Video
          </Typography>
        </FlexBetween>
        
        
        <FlexBetween gap="0.25rem" onClick={() => setIsAttachment(!isAttachment)}  >
          <AttachFileOutlined sx={{ color: mediumMain }} onClick={() => setAttachment([])}/>
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            onClick={() => setAttachment([])}
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
          disabled={!post}
          onClick={()=>{
           
           handlePost();
          }}
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

export default MyPostWidget;