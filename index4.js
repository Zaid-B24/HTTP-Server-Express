const express = require("express");

const app = express();


app.get("/health", function (req, res){
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = req.headers.kidneyId;

  if(username!="Zaid" || password != "Admin"){
    res.status(400).json({"msg":"something up with ur input"})
    return
  }

  if(kidneyId != "1" && kidneyId != "2"){
    res.status(400).json({"msg":"something up with ur kidney value"})
    return
  }

  res.json({
    msg:"Your kidney is fine"
  })
  
});

app.post("/",function(req,res){
    res.send("Success")
});

app.listen(3000);


