const express = require('express');
const bodyParser = require('body-parser');
const jwt = require ("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(bodyParser.json());
app.use(express.json());

function submitData() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Make a POST request to the /signin endpoint
    axios.post('http://localhost:3000/signin', {
        username: username,
        password: password
    })
    .then(function (response) {
        // Handle successful response (JWT token received)
        const token = response.data;
        console.log("JWT token:", token);
        // You can store the token in local storage or use it as needed
    })
    .catch(function (error) {
        // Handle error response
        console.error("Error:", error);
    });
}

// app.use((err, req, res, next) => {
// 	res.status(404).json({
//      msg: "GALAT PAGE HAI BABA!",
//   });
// });


app.listen(3000, function() {
    console.log("Server is running on port 3000");
});