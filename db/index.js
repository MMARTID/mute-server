// conectarnos a la DB
const mongoose = require("mongoose")

mongoose
.connect('mongodb://localhost:27017/mute')
.then(response => console.log(`Connected to Database: "${response.connections[0].name}"`))
.catch(error => console.log("Error connecting to MongoDB", error));