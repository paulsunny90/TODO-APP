const mongoose = require("mongoose");

const connectDB= async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/tudo",{
           
        })
        console.log("db coonected")
    }
    catch(error){
        console.log(error)

    }
};
module.exports=connectDB
 