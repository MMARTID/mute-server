const express = require('express')
const router = express.Router()
const User = require("../models/User.model")

// ===> /api/auth/signup
router.post("/signup", async (req, res, next ) => {

    console.log(req.body)
    const { username, email, password } = req.body

    try{
        const usuarioEncontrado = await User.findOne( { email: email } )
        if (usuarioEncontrado !== null) {
          res.status(400).json({errorMessage: "ya existe un usuario con ese correo electronico"})
          return // detener la ejecución de la ruta
        }
        await User.create({
            username: username,
            email: email,
            password: password
          })
          res.sendStatus(201)

    } catch (error){
        next(error)
    }

});

router.post("/login", async (req, res, next) => {
  console.log(req.body)
  const { username, password } = req.body

  try {
      // Buscar usuario por username
      const usuario = await User.findOne({ username: username })
      
      if (!usuario) {
          // Si no se encuentra el usuario
          return res.status(400).json({ errorMessage: "Usuario no encontrado" })
      }

      // Comparar la contraseña (esto es solo un ejemplo sin cifrado)
      if (usuario.password !== password) {
          // Si la contraseña no coincide
          return res.status(400).json({ errorMessage: "Contraseña incorrecta" })
      }

      // Si el login es exitoso
      res.status(200).json({ message: "Login exitoso" })

  } catch (error) {
      next(error)
  }
})
module.exports = router

