import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
        type: String,
        required: true,
      },
      
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    description: String,
    userPicturePath: String,
   
   
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", postSchema);

export default Comment;
