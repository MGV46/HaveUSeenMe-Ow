import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true,
        
      },
    pName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    specie: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    breed: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      
    },
    gender: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    color: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      age: {
        type: Number,
        required: true,
        
      },
    picturePath: {
      type: String,
      default: "",
    },
    videoPath: {
      type: String,
      default: "",
    },
    audioPath: {
      type: String,
      default: "",
    },
    attachmentPath: {
      type: String,
      default: "",
    },
    
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", UserSchema);
export default Pet;
