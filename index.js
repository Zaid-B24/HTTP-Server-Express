// const express = require("express");
// const app = express();

// const users = [{
//   name:"Ajay",
//   kidneys:[{
//     healthy: false,
//   }]
// }];

// app.use(express.json());

// app.get("/",function(req,res){
//   const johnKidneys = users[0].kidneys;
//   const numberOfKidneys = johnKidneys.length;
//   let healthyKidneys = 0;
//   for(let i = 0; i< johnKidneys.length;i++){
//     if(johnKidneys[i].healthy){
//       healthyKidneys = healthyKidneys +1;
//     }
//   }
//   const unhealthyKidneys = numberOfKidneys - healthyKidneys;
//   res.json({
//     numberOfKidneys,
//     healthyKidneys,
//     unhealthyKidneys
//   })
// })

// app.post("/",function(req,res){
//   const isHealthy = req.body.isHealthy;
//   users[0].kidneys.push({
//     healthy:isHealthy
//   })
//   res.json({
//     msg:"Done!"
//   })
// })

// app.put("/", function (req,res){
//   for(let i = 0; i<users[0].kidneys.length;i++){
//     users[0].kidneys[i].healthy = true;
//   }
//   res.json({});
// })

// app.delete("/", function (req,res){
//   const newKidnneys = [];
//   for(let i = 0; i<users[0].kidneys.length;i++){
//     if (users[0].kidneys[i].healthy){
//       newKidnneys.push({
//         healthy : true
//       })
//     }
//   }
//   users[0].kidneys = newKidnneys;
//   res.json({msg : "done"});
// })


// app.listen(3000);
//////////////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const multer = require("multer");
// const app = express();

// const storage = multer.memoryStorage(); // Store images in memory
// const upload = multer({ storage: storage });

// const users = [{
//   name: "Ajay",
//   kidneys: [{
//     healthy: false,
//   }]
// }];

// app.use(express.json());

// // Use upload middleware for handling image uploads
// app.post("/upload", upload.single("image"), function (req, res) {
//   // Access the uploaded image using req.file.buffer
//   const imageBuffer = req.file.buffer;

//   // Process the image as needed (e.g., save it, analyze it, etc.)
//   // ...

//   res.json({
//     msg: "Image uploaded successfully!",
//   });
// });

// // Rest of your routes...

// app.listen(3000);


const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

const app = express();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const users = [{
  name: "Ajay",
  kidneys: [{
    healthy: false,
  }]
}];

app.use(express.json());
app.use("/uploads", express.static(path.join("HTTP Server Express", "uploads")));

// Upload an image
app.post("/upload", upload.single("image"), async function (req, res) {
  const imageBuffer = req.file.buffer;
  const imageName = req.file.originalname;

  // Save the image to the server
  const imagePath = path.join(__dirname, "uploads", imageName);
  await fs.writeFile(imagePath, imageBuffer);

  res.json({
    msg: "Image uploaded successfully!",
  });
});

// Get the uploaded image
app.get("/image", function (req, res) {
  const imageName = req.query.name;

  if (imageName) {
    const imagePath = path.join(__dirname, "uploads", imageName);
    res.sendFile(imagePath);
  } else {
    res.status(400).json({ error: "Image name not provided" });
  }
});

// Rest of your routes...

app.listen(3000);
