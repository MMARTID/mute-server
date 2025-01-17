const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/", async (req, res, next) => {
  console.log(req);

  try {
    const usersList = await User.find();
    res.status(200).json(usersList);
    // devuelve una lista con todos los usuarios 📋
  } catch (e) {
    next(e);
  }
});

router.get("/:userId", async (req, res) => {
  console.log(req.params);

  try {
    const singleUser = await User.findById(req.params.userId);
    res.status(200).json(singleUser);
    // devuelve el usuario con el id del parametro 📋
  } catch (e) {
    next(e);
  }
});



// VERIFICACION REQUIERIDA ⤵️
router.patch("/:userId", async (req, res, next) => {
  try {
    const updateData = req.body;

    //res.status(200).json({message: "user data"});
  } catch (e) {}
});

module.exports = router;
