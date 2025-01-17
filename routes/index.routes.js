const express = require("express");
const router = express.Router();


router.get("/", (req, res ) => {
    res.status(200).json({message: "server runing"});
    });

const userRoutes = require('./auth.routes.js')
router.use('/auth', userRoutes)

module.exports = router;