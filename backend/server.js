const mong = require("mongoose");
mong.connect("mongodb://0.0.0.0:27017/eTechHub",{useNewUrlParser: true}).
then(()=>{console.log("Database connected succesfully")}).
catch((err)=>{console.log("Error: "+err)})