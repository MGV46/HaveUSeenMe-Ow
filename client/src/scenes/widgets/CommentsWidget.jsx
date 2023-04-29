import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "state";
import CommentWidget from "./CommentWidget";

const PostsWidget = ({ commentId,posteId, isProfile = false }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  let postId1;
  for(let i=0;i<post.length;i++){
    if(post[i]!=null){
     postId1=post[i]._id
    }
  }
 
  const comments = useSelector((state) => state.comments);
  const token = useSelector((state) => state.token);

  const getComments = async () => {
    const response = await fetch("http://localhost:3001/comments", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setComments({ comments: data}));
  };

  

  useEffect(() => {
    
      getComments();
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  

  return (
    <>
      {comments.map(
        ({
          _id,
          userId,
          postId,
          firstName,
          lastName,
          description,
         
          userPicturePath,
          
          
        }) => (
          postId==postId1 ?
          (
          <CommentWidget
            key={_id}
            commentId={_id}
            userId={userId}
            postId={postId}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
           
           
            userPicturePath={userPicturePath}
            rePostId={posteId}
          />
          ):(
            <></>
          )
          
        )
      )}
    </>
  );
};

export default PostsWidget;
