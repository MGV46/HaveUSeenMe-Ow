import express from "express";
import { registerPet } from "../controllers/authP.js";

const router = express.Router();

router.post("/registerPet", registerPet);

export default router;
