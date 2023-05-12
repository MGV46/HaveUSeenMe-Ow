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
import { setaiAunt,setAi, setPosts } from "state";
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
  const [audio, setAudio] = useState(null);
  const [audio1, setAudio1] = useState([]);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const ima=useSelector((state)=>state.ai);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  let modifiedFile;

  let band=useSelector((state)=>state.aiAunt);
  console.log(band);
  
  let cons =0;
  let band1=false;
 console.log(band1+"ban1");
 const handlePost = () => {
  (async () => {
    let c = 0, ver = true;
    if (band) {
      console.log("1");
      const formData1 = new FormData();
      if (image.length > 0) {
        cons++;
        image.forEach((file) => {
          const timestamp = Date.now();
          const randomString = uuidv4();
          modifiedFile = new File([file], `${timestamp}${randomString}${file.name}`, {
            type: file.type,
            lastModified: file.lastModified,
          });
          formData1.append("picture", modifiedFile);
          formData1.append("picturePath", modifiedFile.name);
          
        });
       
        
        console.log(cons + " 2");
        if (band) {
          const response1 = await fetch(`http://localhost:3001/ai`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData1,
          });
          const ai = await response1.json();
          dispatch(setAi({ ai: ai }));
          dispatch(setaiAunt({ aiAunt: false }));
        }
      }
    }
    console.log(image.length+" dfkadsfa");
        
    let cu=ima.length, cant = image.length;
    if (image.length > 0) {
     console.log(ima[cu-1]);
      const isVerificade = ima[cu-1].picturePath.map((image)=>{
        let imagen = new Image(); // Using optional size for image
        imagen.src =`${image}`;
        if(predecir(imagen)){
          c++;
        }
        if(c==cant){
          return true;
        }else{
          return false;
        }
       }
        
       )
       console.log(isVerificade)
      for(let i=0;i<isVerificade.length;i++){
        if(!isVerificade[i]){
         ver=false;
        }
      }
      console.log(ver);
    }

    if (cons === 2) {
      

      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if(image.length>0){
        formData.append("verificate", ver);
      }else{
        formData.append("verificate", false);
      }
      

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

      setImage(null);
      setVideo(null);
      setAttachment(null);
      setAudio(null);
     
      setPost("");
      window.location.reload();

    }
  })();
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
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                   
                    (cons===0?(
                      handlePost()
                    ):(
                      image.map((image)=>(
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                        ))

                    )
                      )

                    
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
          <ImageOutlined sx={{ color: mediumMain }} onClick={() => setImage([])}/>
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            onClick={() => {
              dispatch(setaiAunt({ aiAunt: true}));
              setImage([]);
            }
              
              }
          >
            Image
          </Typography>
        </FlexBetween>
        
        <FlexBetween gap="0.25rem" onClick={() => setIsVideo(!isVideo)}  >
          <OndemandVideoIcon sx={{ color: mediumMain }} onClick={() => setVideo(null)}/>
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            onClick={() => setVideo([])}
          >
            Video
          </Typography>
        </FlexBetween>
        
        
        <FlexBetween gap="0.25rem" onClick={() => setIsAttachment(!isAttachment)}  >
          <AttachFileOutlined sx={{ color: mediumMain }} onClick={() => setAttachment(null)}/>
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
            band1=true;
          cons=2;
          dispatch(setaiAunt({ aiAunt: false }));
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