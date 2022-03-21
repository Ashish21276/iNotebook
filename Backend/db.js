const mongoose = require("mongoose");

const connectToMongo = async () => {
  await mongoose.connect(process.env.DATABASE);
  console.log("Connected to Mongo Successfully");
};

module.exports = connectToMongo;
