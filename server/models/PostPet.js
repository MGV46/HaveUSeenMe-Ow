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
    picturePath: {
      type: Array,
      default: [],
    },
    videoPath: {
      type: Array,
      default: [],
    },
    audioPath:{
      type: Array,
      default: [],
    },
    attachmentPath:{
      type: Array,
      default: [],
    },
    userPicturePath: String,
    
  },
  { timestamps: true }
);

const PostPet = mongoose.model("PostPet", postSchema);

export default PostPet;
