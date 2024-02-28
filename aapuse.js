// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// app.post("/", function(req, res){
//     const a = req.body.a;
//     res.send(a);
// });

// app.use((err, req, res, next) => {
// 	res.status(404).json({
//      msg: "GALAT PAGE HAI BABA!",
//   });
// });

// app.listen(4000);

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
import { z } from "zod";
app.use(bodyParser.json());

app.post("/health-checkup", (req, res) => {
  const kidneys = req.body.kidneys;
//   const kidneyLength = kidneys.length;

  res.send("you have " + kidneys + " kidneys!");
});

// app.use((err, req, res, next) => {
// 	res.status(404).json({
//      msg: "GALAT PAGE HAI BABA!",
//   });
// });
app.all("*", function(req, res) {
    res.json("invalid");
})

app.listen(3000);