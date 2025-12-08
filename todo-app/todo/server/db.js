const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/todo");
        console.log("DB connected");
    } catch (error) {
        console.log("DB error:", error);
    }
};

module.exports = connectDB;

