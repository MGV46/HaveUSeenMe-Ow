import bcrypt from "bcrypt";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
/* REGISTER USER */
export const registerPet = async (req, res) => {
  
    try {
      const {
        userId,
        pName,
        specie,
        breed,
        gender,
        color,
        age,
        picturePath,
        videoPath,
        audioPath,
        attachmentPath,
        
      } = req.body;
      const user = await User.findById(userId);
      
  
      const newPet = new Pet({
        userId,
        pName,
        specie,
        breed,
        gender,
        color,
        age,
        picturePath,
        videoPath,
        audioPath,
        attachmentPath,
        
      });
      
      const savedPet = await newPet.save();
      res.status(201).json(savedPet);
    } catch (err) {
      console.error("user friends non-existent :(");
      res.status(500).json({ error: err.message });
    }
  };