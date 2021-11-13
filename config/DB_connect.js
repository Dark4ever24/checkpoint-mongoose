const mongoose = require("mongoose");

const DBconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database is connected :p");
  } catch (err) {
    console.log("databse is not connected :( ", err);
  }
};

module.exports = DBconnect;
