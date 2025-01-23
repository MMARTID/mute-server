const router = require("express").Router();

const User = require("../models/User.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/auth.verify");

// POST "/api/auth/signup" => registra el usuario
router.post("/signup", async(req, res, next) => {

  // recibir la data del usuario
  console.log(req.body)
  const { username, email, password } = req.body

  // validaciones
  // 0. que la data exista
  if (!username || !email || !password) {
    res.status(400).json({errorMessage: "nombre de usuario, correo electronico y contraseña son campos obligatorios"})
    return // detener la ejecución de la ruta
  }

  // 1. username minimo 3 caracteres
  if (username.length < 3) {
    res.status(400).json({errorMessage: "nombre de usuario debe tener 3 caracteres como mínimo"})
    return // detener la ejecución de la ruta
  }

  // 2. contraseña con nivel de seguridad
  const regexPasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (regexPasswordPattern.test(password) === false) {
    res.status(400).json({errorMessage: "La contraseña no es valida. Debe contener mínimo 8 caracteres, una mayuscula, una minuscula y 1 número"})
    return // detener la ejecución de la ruta
  }

  // 3. correo electronico con formato correcto (la pueden implementar ustedes)
  
  
  // crear el usuario
  try {
    
    // 4. que el email sea unico
    const usuarioEncontrado = await User.findOne( { email: email } )
    if (usuarioEncontrado !== null) {
      res.status(400).json({errorMessage: "ya existe un usuario con ese correo electronico"})
      return // detener la ejecución de la ruta
    }

    // cifrar la contraseña
    const contraseñaCifrada = await bcryptjs.hash(password, 12)
    
    await User.create({
      username: username,
      email: email,
      password: contraseñaCifrada
    })
    res.sendStatus(201)

  } catch (error) {
    next(error)
  }

})

// POST "/api/auth/login" => autenticación del usuario y envio del token
router.post("/login", async(req, res, next) => {

  const { email, password } = req.body

  // los campos obligatorios
  if (!email || !password) {
    res.status(400).json({errorMessage: "correo electronico y contraseña son campos obligatorios"})
    return // detener la ejecución de la ruta
  }

  try {
    
    // el usuario debe existir en la DB
    const usuarioEncontrado = await User.findOne({ email: email })
    console.log(usuarioEncontrado)
    if (usuarioEncontrado === null) {
      res.status(400).json({errorMessage: "usuario no encontrado con ese correo electronico"})
      return // detener la ejecución de la ruta
    }

    // la contraseña debe ser correcta
    const isPasswordCorrect = await bcryptjs.compare(password, usuarioEncontrado.password)
    if (isPasswordCorrect === false) {
      res.status(400).json({errorMessage: "contraseña incorrecta"})
      return // detener la ejecución de la ruta
    }

    // YA HEMOS AUTENTICADO AL USUARIO. le vamos a entregar el usuario su llave virtual

    const payload = {
      _id: usuarioEncontrado._id,
      email: usuarioEncontrado.email,
      role: usuarioEncontrado.role
    } // el payload es toda información estatica y unica que identifica al usuario

    const tokenConfig = {
      algorithm: "HS256",
      expiresIn: "7d"
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, tokenConfig)

    res.status(202).json({authToken: authToken})

  } catch(error) {
    next(error)
  }


})

// GET "/api/auth/verify" => validación del token
router.get("/verify", verifyToken, (req, res, next) => {

  // esta ruta solo se usa para verificar el token una vez cuando el usuario está navegando por primera vez por la web.
  // se usa para indicar al front que el usuario es valido y quien es ese usuario.

  res.status(202).json({ payload: req.payload })

})


module.exports = router;