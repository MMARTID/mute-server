const router = require("express").Router()


router.get("/", (req, res ) => {
    res.status(200).json({message: "server runing"});
    });

const authRoutes = require('./auth.routes.js')
router.use('/auth', authRoutes)

const userRoutes = require('./user.routes.js')
router.use('/users', userRoutes)

const postRoutes = require('./post.routes.js')
router.use('/posts', postRoutes)

const commentRoutes = require('./comment.routes.js')
router.use('/comments', commentRoutes)

module.exports = router;