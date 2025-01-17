const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const {verifyToken} = require('../middlewares/auth.verify')
// ===> /api/auth/signup
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  try {
    // comprobar que no existe un usuario con el mismo email
    const usuarioEncontrado = await User.findOne({ email: email });

    if (usuarioEncontrado !== null) {
      res
        .status(400)
        .json({
          errorMessage: "ya existe un usuario con ese correo electronico",
        });
      return;
    }

    // cifrar la contraseña
    const contraseñaCifrada = await bcryptjs.hash(password, 12);

    // crear el usuario en la base de datos
    await User.create({
      username: username,
      email: email,
      password: contraseñaCifrada,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// ===> /api/auth/signup
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Buscar si existe un usuario con el email del request
    const usuarioEncontrado = await User.findOne({ email: email });

    // Si no se encuentra el usuario devuelve un error
    if (!usuarioEncontrado) {
      return res.status(400).json({ errorMessage: "Usuario no encontrado" });
    }

    // comporbar que la contraseña es correcta
    const contraseñaCorrecta = await bcryptjs.compare(
      password,
      usuarioEncontrado.password
    );
    if (!contraseñaCorrecta) {
      return res.status(400).json({ errorMessage: "contraseña incorrecta" });
    }
    // YA HEMOS AUTENTICADO AL USUARIO. le vamos a entregar el usuario su llave virtual

    const payload = {
      _id: usuarioEncontrado._id,
      email: usuarioEncontrado.email,
      role: usuarioEncontrado.role,
    }; // el payload es toda información estatica y unica que identifica al usuario

    const tokenConfig = {
      algorithm: "HS256",
      expiresIn: "7d",
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, tokenConfig);

    res.status(202).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});    
router.get("/verify", verifyToken, (req, res, next) => {

    // esta ruta solo se usa para verificar el token una vez cuando el usuario está navegando por primera vez por la web.
    // se usa para indicar al front que el usuario es valido y quien es ese usuario.
  
    res.status(202).json({ payload: req.payload })
});

module.exports = router;
