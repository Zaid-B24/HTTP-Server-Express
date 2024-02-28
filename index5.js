const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

const app = express();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads")); // Specify the directory for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

// GET route to display a form for uploading an image
app.get("/", function (req, res) {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="image" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// POST route to handle image upload
app.post("/upload", upload.single("image"), function (req, res) {
  res.send("Image uploaded successfully!");
});

// GET route to retrieve the uploaded image
app.get("/image", function (req, res) {
  const imagePath = path.join(__dirname, "uploads", "1707074021377.jpg");
  
  // Check if the file exists
  fs.access(imagePath, fs.constants.F_OK)
    .then(() => {
      // If the file exists, send it as a response
      res.sendFile(imagePath);
    })
    .catch(() => {
      // If the file doesn't exist, send an error response
      res.status(404).send("Image not found");
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
