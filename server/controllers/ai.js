import Ai from "../models/ai.js";


/* CREATE */
export const createAi = async (req, res) => {
  try {
    const { picturePath} = req.body;
    
    
    const newAi = new Ai({
      
      picturePath,
      
    });
    await newAi.save();

    const ai = await Ai.find();
    res.status(201).json(ai);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
