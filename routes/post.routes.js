const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.verify.js");
const Post = require("../models/Post.model");


// ==> /api/posts
// ❌🔓❌ RUTA PARA TRAER //! TODOS LOS POSTS // DE TIPO GENERAL CUANDO EL USUARIO NO ESTA LOGUEADO
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find({ visibility : "general"}).populate({
      path: "author",
      select: "username profilePicture",
    });
    res.status(200).json(allPosts);
  } catch (error) {}
});

// ==> /api/posts/all
// 🔐 RUTA PARA TRAER //! TODOS LOS POSTS // DE TIPO GENERAL y PRIVATE(CHNG TO USERS TYPE) 
router.get("/all", verifyToken, async (req, res) => {
    try {
      const allPosts = await Post.find().populate({
        path: "author",
        select: "username profilePicture",
      });
      res.status(200).json(allPosts);
    } catch (error) {
        console.log(error)
        res.json(error)
    }
  });  


//==> /api/posts/:userId
// ❌🔓❌ TRAE POSTS DE TIPO GENERAL DE UN //!UNICO USUARIO
router.get("/:userId", async (req, res, next) => {
  try {
    const posts = await Post.find({ 
        author: req.params.userId,
        visibility: "general"
    }).populate({
      path: "author",
      select: "username profilePicture",
    })

    res.status(200).json(posts);

  } catch (e) {
    next(e);
  }
});

// ==> /api/posts/:postId
// 🔐 PUBLICA UN POST 
router.post("/:userId", verifyToken, async (req, res) => {
    console.log(req.payload)
  try {
    const { author, title, content, visibility } = req.body;

    if(req.payload._id !== req.params.userId) {
        res.status(401).json({errorMessage: "MENUDO HACKER"})
        return
    }
    const newPost = await Post.create({
      author: author,
      title: title,
      content: content,
      visibility: visibility,
    });
    res.status(201).json(newPost);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
