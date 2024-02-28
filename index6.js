const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const app = express();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// GET route to display a form for uploading a video
app.get("/", function (req, res) {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="video" accept="video/*" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// POST route to handle video upload
app.post("/upload", upload.single("video"), function (req, res) {
  res.send("Video uploaded successfully!");
});

// GET route to stream the uploaded video
app.get("/video", function (req, res) {
  const videoPath = path.join(__dirname, "uploads", "1707075388864.mp4");
  console.log("Video Path:", videoPath);
  // Check if the file exists
  fs.access(videoPath, fs.constants.F_OK)
    .then(() => {
        console.log("Video Path:", videoPath);

      // If the file exists, create a readable stream and pipe it to the response
      const stream = fs.createReadStream(videoPath);
      stream.pipe(res);
    })
    .catch(() => {
      // If the file doesn't exist, send an error response
      res.status(404).send("Video not found");
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
