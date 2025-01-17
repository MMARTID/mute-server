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
    const user = await User.findByIdAndUpdate(
     req.params.userId, 
     updateData, 
     { new: true, runValidators: true } // `new` devuelve el documento actualizado, `runValidators` valida el modelo
    );
    res.status(200).json(user);
  } catch (e) {
    next(e)
  }
});

module.exports = router;
