require('dotenv').config();
const mongoose = require('mongoose');

const databaseConnection = async (collection) => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${collection}`);
    console.log("Mongoose is connected to: ", collection);
  } catch (err) {
    console.log(err.message);
  }
}

const databaseDisconnection = async () => {
  try {
    await mongoose.disconnect();
    console.log("Mongoose disconnected");
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { databaseConnection, databaseDisconnection };