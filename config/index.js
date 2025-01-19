function config (app) {

  const express = require("express");
  const logger = require("morgan");
  const cors = require("cors");
    
  //CORS middleware
  app.use(cors({ 
      origin : ['http://localhost:3000' , 'http://localhost:5173']
  }))

  app.use(express.json());
  app.use(logger("dev"));
  app.use(express.static("view"));
  app.use(express.urlencoded({ extended: false }));
  
}

module.exports = config


