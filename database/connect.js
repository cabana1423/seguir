var mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/databasep", {useNewUrlParser: true});
var db = mongoose.connection;
db.on("error",()=>{
    cosole.log("error no se conecta")
});
db.on("open",()=>{
    console.log("coneccion exitosa")
});
module.exports=mongoose;