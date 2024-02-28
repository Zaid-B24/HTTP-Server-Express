const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://zayd:zayd@cohort1.bz5t71n.mongodb.net/")

const User = mongoose.model('Users',{name:String,
email:String, password:String});

const user = new User ({
    name:"Zayd",
    email:"zaidbaig738@gmail.com",
    password:"asdfghjkl"
});
user.save();