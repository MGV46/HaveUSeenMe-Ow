import PostPet from "../models/PostPet.js";
import User from "../models/User.js";

/* CREATE */
export const createPostPet = async (req, res) => {
  try {
    const { petId,userId, description, picturePath, videoPath, audioPath, attachmentPath} = req.body;
    const user = await User.findById(userId);
    const newPostPet = new PostPet({
      petId,
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      videoPath,
      attachmentPath,
      audioPath,
      
    });
    await newPostPet.save();

    const postPet = await PostPet.find();
    res.status(201).json(postPet);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */


export const getPetPosts = async (req, res) => {
  try {
    const { petId } = req.params;
    const postPet = await PostPet.find({ petId });
    res.status(200).json(postPet);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

