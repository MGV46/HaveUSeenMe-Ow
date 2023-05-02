import Conversation from "../models/Conversation.js";

/* CREATE */
export const createConversation = async (req, res) => {
  try {
    const { currentId, friendId } = req.body;
    const newConversation = new Conversation({
      members: [currentId,friendId]
    });
    await newConversation.save();

    const conversation = await Conversation.find();
    res.status(201).json(conversation);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};