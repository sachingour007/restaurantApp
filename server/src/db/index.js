const mongoose = require("mongoose");
const { DB_Name } = require("../constant/constant.js");

const connectDB = async () => {
  try {
    const connectionInstance = mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
    console.log(`\n MongoDB connected !! DB HOST:${connectionInstance?.connection?.host}`);
  } catch (error) {
    console.log("MONGODB Connect Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
