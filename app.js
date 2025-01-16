require('dotenv').config();

const PORT = process.env.PORT;

const express = require("express");
const app = express(); // inicializa express ;)

require("./db")

const config = require("./config")
config(app)

const indexRouter = require("./routes/index.routes.js")
app.use('/api', indexRouter )

//const errorHandling = require("./error-handling")


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});