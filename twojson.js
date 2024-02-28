const express = require('express');
const bodyParser = require('body-parser');
const jwt = require ("jsonwebtoken");
const jwtPassword = "123456";
const z = require ("zod")
const app = express();
app.use(bodyParser.json());
app.use(express.json());

let jsonData = null; // Variable to store JSON data

const mySchema = z.array(z.number());

app.post("/signin",  function(req, res) {
    jsonData = req.body;
    var token = jwt.sign({jsonData:jsonData},jwtPassword);
    res.json(token);
    console.log(jsonData);
});

app.get("/get", function(req, res) {
    if (jsonData) {    
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const jsonData = decoded.jsonData;
        res.send(jsonData)
    }

    catch(err){
        return res.status(403).json({
            msg: " Invvalid token",
        });
    }
    } else {
        res.send("No data available!");
    }
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
