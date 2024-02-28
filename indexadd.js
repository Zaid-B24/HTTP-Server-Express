const express = require('express');

const app = express();


app.get("/", function(req,res){

    const firstnum = parseInt(req.query.firstnum, 10);
    const SecondNum = parseInt(req.query.SecondNum, 10);
    const sum = firstnum + SecondNum;
    
    res.json(sum);

});

app.listen(3000);