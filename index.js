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
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";


/* config */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "15mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));
app.use(cors());
app.use("tmp/assets", express.static(path.join(__dirname, 'tmp/public/assets')));

/* file storage */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "tmp/public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/* Routes with files */
app.post("tmp/auth/register", upload.single("picture"), register);
app.post("tmp/posts", verifyToken, upload.single("picture"), createPost);

/* Routes */
app.use("tmp/auth", authRoutes);
app.use("tmp/users", userRoutes);
app.use("tmp/posts", postRoutes);

// Connecting frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});

/* MongoDB setup */
const PORT = process.env.PORT || 6001;

// suppress deprecation warning
mongoose.set('strictQuery', true);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

    // inject mock data on initial run
    // User.insertMany(users);
    // Post.insertMany(posts);

}).catch((error) => console.log(`${error} did not connect`));