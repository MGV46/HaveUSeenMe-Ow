import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    
    picturePath: {
      type: Array,
      default: [],
    },
    
  },
  { timestamps: true }
);

const Ai = mongoose.model("Ai", postSchema);

export default Ai;
