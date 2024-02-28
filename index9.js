const express = require("express");
const app = express();
const z = require ("zod")

const schema =  z.array(z.number());

app.use(express.json());
app.post("/health-checkup", function(req,res){
    const kidneys = req.body.kidneys;
    const resposne =  schema.safeParse(kidneys)
    
    res.send({
        resposne
    });
});



app.listen(3001);