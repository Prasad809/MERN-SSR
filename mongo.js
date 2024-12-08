let mongoose=require("mongoose")
mongoose.connect('mongodb://localhost:27017/Customer')
.then(()=>{
    console.log("Mongodb is Connected Successfully.....");
}).catch(()=>console.log("Connection failed"))

//creating Schema
let customer=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//creating mongodb model
let collection=new mongoose.model("collection",customer)
module.exports=collection