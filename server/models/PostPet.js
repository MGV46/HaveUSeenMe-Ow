import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    petId: {
        type: String,
        required: true,
      },
    userId: {
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
    location: String,
    description: String,
    picturePath: String,
    videoPath: String,
    audioPath: String,
    attachmentPath: String,
    userPicturePath: String,
    
  },
  { timestamps: true }
);

const PostPet = mongoose.model("PostPet", postSchema);

export default PostPet;
