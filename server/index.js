import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutesP from "./routes/authP.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import postPetRoutes from "./routes/postsPets.js";
import petRoutes from "./routes/pets.js";
import commentRoutes from "./routes/comments.js";
import { register} from "./controllers/auth.js";
import { registerPet } from "./controllers/authP.js";
import { createPost } from "./controllers/posts.js";
import { createPostPet } from "./controllers/postsPets.js";
import { createComment} from "./controllers/comments.js";
import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/authP/registerPet", upload.single("picture"), registerPet);
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.array("picture"), createPost);
app.post("/postsPets", verifyToken, upload.array("picture"), createPostPet);
app.post("/comments", verifyToken, upload.single("picture"), createComment);
/* ROUTES */
app.use("/auth", authRoutes);

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/postsPets", postPetRoutes);
app.use("/pets", petRoutes);
app.use("/comments",commentRoutes);
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    //User.insertMany(users);
    //Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));