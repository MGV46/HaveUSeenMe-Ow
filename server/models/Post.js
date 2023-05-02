import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
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
    audioPath: {
      type: Array,
      default: [],
    },
    attachmentPath: {
      type: Array,
      default: [],
    },
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
    verificate: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
