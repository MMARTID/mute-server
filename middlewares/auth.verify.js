const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
  // 1. verificar que el token es valido
  // 2. extraer el payload (saber quien es el dueño de ese token) para hacerselo saber tanto a las rutas de backend como al frontend.

  try {
    
    console.log("ejecutando el middleware")
    const token = req.headers.authorization.split(" ")[1]

    const payload = jwt.verify(token, process.env.TOKEN_SECRET)
    // si comprueba que el token es valido, continua con el next()
    // si comprueba que el token no es valido moverse al catch
    // si el token es valido, nos devuelve la info de ese usuario
    // console.log(payload)
    req.payload = payload

    next() // continua con la ruta

  } catch (error) {
    res.status(401).json({errorMessage: "Token no valido o no existe"})
  }

}

function verifyAdmin(req, res, next) {

  if (req.payload.role === "admin") {
    next() // continua con la ruta
  } else {
    res.status(401).json({errorMessage: "Ruta solo para usuarios de tipo admin"})
  }

}

module.exports = {
  verifyToken,
  verifyAdmin
}