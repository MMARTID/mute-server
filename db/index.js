// conectarnos a la DB
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mute";
mongoose
  .connect(MONGO_URI)
  .then((response) =>
    console.log(`Connected to ${response.connections[0].name} database`)
  )
  .catch((error) => console.log("Error connecting to MongoDB", error));
