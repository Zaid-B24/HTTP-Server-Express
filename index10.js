const express = require("express");
const jwt = require ("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());
const ALL_USERS = [
    {
        username: "zaidbaig738@gmail.com",
        password: "123",
        name: "Zayd Baig",
    },
    {
        username: "test@gmail.com",
        password: "12321",
        name: "AJey Dhobale",
    },
    {
        username: "trial@gmail.com",
        password: "1234567",
        name: "trial",
    },
];

function userExists(username, password){

    let userExists = false;

    for(let i = 0; i < ALL_USERS.length;i++){
        if(ALL_USERS[i].username==username && ALL_USERS[i].password==password){
        userExists = true;
        }
    }
    return userExists;
}

app.post("/signIn", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username,password)){
        return res.status(403).json({
            msg: " user doesnt exist",
        });
    }

    var token = jwt.sign({username: username},jwtPassword);
    return res.json({
        token,
    });

});

app.get("/users", function (req, res){
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        res.json({
            users: ALL_USERS
        })
    }

    catch(err){
        return res.status(403).json({
            msg: " Invvalid token",
        });
    }
});

app.listen(3000);