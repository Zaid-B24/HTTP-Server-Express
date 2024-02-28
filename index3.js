const express = require("express");
const multer = require('multer');
const path =  require('path');
const app = express();

const storage = multer.diskStorage({
    destination: (req, file,cb) => {
        cb(null,'images')
    },

    filename: (req, file, cb) =>{
        cb(null,Date.now() + path.extname(file.originalnmae))
    }
});

const upload = multer({storage:storage})

app.get("/upload", (req,res) =>{
    res.render("upload ");
});

app.post("/upload", upload.single('image') ,(req,res) =>{
    res.send("Success ");
});

app.listen(3001);
