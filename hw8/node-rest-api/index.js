const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");
const multer = require("multer");
const path = require("path");

// BEGIN PART 3
dotenv.config()

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("");
  }
);

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// "/api/auth"
app.use("/api/auth", authRoute)
// "/api/users"
app.use("/api/users", userRoute)
// "/api/posts"
app.use("/api/posts", postRoute)

// END PART 3

// (IGNORE) IMAGE UPLOAD HANDLING
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded");
  } catch (error) {
    console.log(error);
  }
});

app.listen(8800, () => {
  console.log("Node server is running!");
});
