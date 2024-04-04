const mongoose = require("mongoose");
require("dotenv").config();

const Connect_DB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("connect Db");
    });
};

module.exports = {
  Connect_DB,
};
