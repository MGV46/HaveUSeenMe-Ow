import express from "express";
import {
  getPet,
  getUserPets
} from "../controllers/pets.js";
import { verifyTokenP } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyTokenP, getPet);
router.get("/:userId/pets", verifyTokenP, getUserPets);

export default router;
