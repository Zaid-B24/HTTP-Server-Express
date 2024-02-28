const express = require("express");
const app = express();

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.headers.kidneyid; // Adjusted to match header case

    if (username !== "Zaid" || password !== "Admin") { // Adjusted condition logic
        res.status(400).json({
            msg: "Incorrect username or password",
        });
    } else {
        req.kidneyId = kidneyId; // Pass kidneyId to next middleware
        next();
    }
}

function kidneyMiddleware(req, res, next) {
    const kidneyId = req.kidneyId; // Retrieve kidneyId from request object
    if (kidneyId !== "1" && kidneyId !== "2") { // Adjusted condition logic
        res.status(400).json({
            msg: "Incorrect kidney id",
        });
    } else {
        next();
    }
}

app.get("/health", userMiddleware, kidneyMiddleware, function(req, res) {
    res.send("success");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
