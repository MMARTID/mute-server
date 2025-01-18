const router = require("express").Router()

// ==> /api
router.get("/", (req, res ) => {
    res.status(200).json({message: "server runing"});
    });
    
// ==> /api/auth
const authRoutes = require('./auth.routes.js')
router.use('/auth', authRoutes)

// ==> /api/users
const userRoutes = require('./user.routes.js')
router.use('/users', userRoutes)

// ==> /api/posts
const postRoutes = require('./post.routes.js')
router.use('/posts', postRoutes)

// ==> /api/comments
const commentRoutes = require('./comment.routes.js')
router.use('/comments', commentRoutes)

module.exports = router;