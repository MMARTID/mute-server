const express = require('express')
const router = express.Router()
const User = require("../models/User.model")
const bcryptjs = require("bcryptjs")

// ===> /api/auth/signup
router.post("/signup", async (req, res, next ) => {

    console.log(req.body)
    const { username, email, password } = req.body

    try{
        const usuarioEncontrado = await User.findOne( { email: email } )

        //comprobar que no existe un usuario con el mismo email
        if (usuarioEncontrado !== null) {
          res.status(400).json({errorMessage: "ya existe un usuario con ese correo electronico"})
          return 
        }

        // cifrar la contraseña
        const contraseñaCifrada = await bcryptjs.hash(password, 12)

        await User.create({
            username: username,
            email: email,
            password: contraseñaCifrada
          })
          res.sendStatus(201)

    } catch (error){
        next(error)
    }

});

router.post("/login", async (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body

  try {
      // Buscar usuario por email
      const usuario = await User.findOne({ email : email })
      
      if (!usuario) {
          // Si no se encuentra el usuario
          return res.status(400).json({ errorMessage: "Usuario no encontrado" })
      }

      // Comparar la contraseña (ejemplo sin cifrado )
      if (usuario.password !== password) {
          // Si la contraseña no coincide
          return res.status(400).json({ errorMessage: "Contraseña incorrecta" })
      }

      // Si el login es exitoso
     const compararContraseña = axait 

  } catch (error) {
      next(error)
  }
})
module.exports = router

