require('dotenv').config();
const mongoose = require('mongoose');

const databaseConnection = async (databaseName) => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${databaseName}`);
    console.log("Mongoose is connected to:", databaseName);
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