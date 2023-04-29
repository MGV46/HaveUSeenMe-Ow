
import User from "../models/User.js";
import Comment from "../models/Comment.js";
/* CREATE */
export const createComment = async (req, res) => {
  try {
    const { userId,postId, description} = req.body;
    const user = await User.findById(userId);
   
    const newComment = new Comment({
      userId,
      postId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      userPicturePath: user.picturePath,
      
    });
    await newComment.save();
    
    const comment = await Comment.find();
    res.status(201).json(comment);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getComments = async (req, res) => {
  try {
    const comment = await Comment.find();
    res.status(200).json(comment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
