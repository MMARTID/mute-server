const express = require('express')
const router = express.Router()
const User = require("../models/User.model")

//api/users
router.post("/", async (req, res, next ) => {

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

module.exports = router

