import express from "express";
import { getPetPosts } from "../controllers/postsPets.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:petId/postsPets", verifyToken, getPetPosts);



export default router;
