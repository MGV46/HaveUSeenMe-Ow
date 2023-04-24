import Pet from "../models/Pet.js";

/* READ */
export const getPet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    res.status(200).json(pet);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserPets = async (req, res) => {
  try {
    const { userId } = req.params;
    const pet = await Pet.find({ userId });
    res.status(200).json(pet);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
