const mongoose = require("mongoose");

const main = async () => {

  // console.log(process.env.DB_CONNECT_STRING)
  await mongoose.connect(process.env.DB_CONNECT_STRING)

}

module.exports = main;