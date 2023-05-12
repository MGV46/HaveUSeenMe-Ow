import User from "../models/User.js";
import Pet from "../models/Pet.js";
/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getPet = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const pet = await Pet.findById(userId)
    
    res.status(200).json(pet);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath, videoPath, audioPath, attachmentPath}) => {
        return { _id, firstName, lastName, occupation, location, picturePath, videoPath, audioPath, attachmentPath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
//FetchALLuSERS
export const fetchUsersCtrl = async(req, res) => {
  try{
    const allUsers = await User.find({});
    res.json(allUsers);
  }catch(error){
    res.json(error);
  }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath, videoPath }) => { 
        return { _id, firstName, lastName, occupation, location, picturePath, videoPath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};