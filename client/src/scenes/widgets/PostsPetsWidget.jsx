import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostsPets } from "state";
import PostPetWidget from "./PostPetWidget";

const PostsPetsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const postsPets = useSelector((state) => state.postsPets);
  const token = useSelector((state) => state.token);
  const petsId = useSelector((state) => state.pets);
  
const petId  = useSelector((state)=> state.pet);
  let Id;
  for(let i=0;i<petId.length;i++){
    if(petId[i]!=null){
     Id=petId[i]._id;
    
    }
  }
  const getPetPosts = async () => {
   
    const response = await fetch(
      `http://localhost:3001/postsPets/${Id}/postsPets`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPostsPets({ postsPets: data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }) }));
  };

  useEffect(() => {
   
      getPetPosts();
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  

  return (
    <>
      {postsPets.map(
        ({
          _id,
          petId,
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
          createdAt,
          
        }) => (
          <PostPetWidget
            key={_id}
            postId={_id}
            postPetId={petId}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            videoPath={videoPath}
            audioPath={audioPath}
            attachmentPath={attachmentPath}
            userPicturePath={userPicturePath}
            createdAt={createdAt}
        
          />
        )
      )}
    </>
  );
};

export default PostsPetsWidget;
