import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getPet,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:userId/pets", verifyToken, getPet);
/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;
