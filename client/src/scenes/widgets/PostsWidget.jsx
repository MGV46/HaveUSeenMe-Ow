import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false, socket, user }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }) }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }) }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  

  return (
    <>
      {posts.map(
        ({
          _id,
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
          likes,
          comments,
          createdAt,
          verificate,
        }) => (
          
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            name2={firstName}
            description={description}
            location={location}
            picturePath={picturePath}
            videoPath={videoPath}
            audioPath={audioPath}
            attachmentPath={attachmentPath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            verificate={verificate}
            createdAt={createdAt}
            socket={socket}
            user={user}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
