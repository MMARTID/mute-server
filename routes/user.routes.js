const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { verifyToken } = require("../middlewares/auth.verify");

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

// ==> /api/users/:userId
router.get("/:userId", verifyToken, async (req, res, next) => {
  const { userId } = req.params;
  const { _id } = req.payload;
  console.log(_id);

  try {
    const singleUser = await User.findById(userId);

    //NO ENCUENTRA UN USUARIO CON EL ID DEL PARAMETRO
    if (!singleUser) {
      return res.status(404) .json({ message: "No existe un usuario con ese ID" });
    }

    //SI EL ID NO ES EL MISMO QUE EL DE EL PAYLOAD, DEVUELVE TODO EL DOCUMENTO(USUARIO LOGGUEADO)
    if (_id === userId) {
      return res.status(200).json(singleUser);
    }

    //(copia de datos modelo)SELECCIONAMOS LA DATA PUBLICA DE LOS USUARIOS A DEVOLVER
    const publicUserData = {
      username: singleUser.username,
      profilePicture: singleUser.profilePicture,
      role: singleUser.role,
    };

    // DEVOLVEMOS LA DATA PUBLICA DE LOS USUARIOS CON LA INFORMACION RESTRINGIDA📋
    res.status(200).json(publicUserData);

  } catch (e) {

    next(e);

  }
});

// VERIFICACION REQUIERIDA ⤵️
router.patch("/:userId", verifyToken, async (req, res, next) => {
  try {
    const updateData = req.body;
    // nos aseguramos de que solo se pueda actualizar si la id del payload y del cliente coinciden
    if (req.payload.userId !== req.params.userId) {
      res
        .status(401)
        .json({
          errorMessage: "No tienes permisos para actualizar este usuario",
        });
      return;
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      updateData,
      { new: true, runValidators: true } // `new` devuelve el documento actualizado, `runValidators` valida el modelo
    );
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
