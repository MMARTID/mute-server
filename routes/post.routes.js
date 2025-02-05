const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.verify.js");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model")


// ==> /api/posts
// ❌🔓❌ RUTA PARA TRAER //! TODOS LOS POSTS // DE TIPO GENERAL CUANDO EL USUARIO NO ESTA LOGUEADO
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find({ visibility : "general"}).populate({
      path: "author",
      select: "username profilePicture",
    });
    res.status(200).json(allPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Ha ocurrido un error en el servidor" });
  }
});

// ==> /api/posts/all
// 🔐 RUTA PARA TRAER //! TODOS LOS POSTS // DE TIPO GENERAL y PRIVATE(CHNG TO USERS TYPE) 
router.get("/all/:type", verifyToken, async (req, res) => {
  console.log(req.params)
  try {
    const query = req.params.type === "all" ? {} : { type: req.params.type };

    const allPosts = await Post.find(query).populate({
      path: "author",
      select: "username profilePicture",
    });

    res.status(200).json(allPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error al obtener los posts" });
  }
  });  




//==> /api/posts/:userId
// ❌🔓❌ TRAE POSTS DE TIPO GENERAL DE UN //!UNICO USUARIO
router.get("/:userId", async (req, res, next) => {
  try {
    const posts = await Post.find({ 
        author: req.params.userId,
        
    }).populate({
      path: "author",
      select: "username profilePicture",
    })
    console.log(posts)
    res.status(200).json(posts);

  }catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Ha ocurrido un error en el servidor" });
  }
});




// ==> /api/posts/:userId
// 🔐 PUBLICA UN POST 
router.post("/:userId", verifyToken, async (req, res) => {
    console.log(req.body)
  try {
    const { author, title, type ,content, visibility } = req.body;

    if (!content || !visibility) {
      return res.status(400).json({ errorMessage: "Todos los campos son obligatorios" });
    }

    if(req.payload._id !== req.params.userId) {
        res.status(401).json({errorMessage: "solo puedes publicar tus propios posts"})
        return
    }

    const newPost = await Post.create({
      author: req.body.loggedUserId,
      title: title,
      content: content,
      type: type,
      visibility: visibility,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Ha ocurrido un error en el servidor" });
  }
});



router.delete("/:postId", verifyToken, async (req, res) => {
  try {
    const { postId } = req.params
    
    const post = await Post.findById(postId)
    
    if(!post) {
      res.status(404).json({errorMessage: "Post no encontrado"})
      return
    }
    await Post.findByIdAndDelete(postId)
    res.sendStatus(204)
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Ha ocurrido un error en el servidor" });
  }
});







// ==> api/posts/:postId/likes
// ❌🔓❌  TRAE LOS LIKES DE UN POST
router.get('/:postId/likes', async (req, res) => {
  try {
    console.log(req.params)
    const {postId} = req.params
    //cogemos solo la porpiedad likes de postId
    const post = await Post.findById(postId, "likes")
    //devolvemos un objeto que tiene el id del comentario al que se le dio like y el array de likes
    res.status(200).json(post)
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Ha ocurrido un error en el servidor" });
  }
})

// ==> api/posts/:postId/likes
// 🔐 AÑADE UN LIKE
router.patch("/:postId/:userId", verifyToken, async (req, res) => {

  try {
    console.log(req.params)
    const { postId , userId } = req.params
    
   

    const post= await Post.findById(postId)
    // comprobar si el id del like existe
    if (!post) {
      return res.status(404).json({ message: 'este post ha sido eliminado o no existe' });
    }
    if (post.likes.includes(userId)) {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },  // Usa $pull para eliminar el userId de likes
        { new: true }  // Devuelve el post actualizado
      );
      return res.status(200).json({ message: "Like eliminado", post: updatedPost });
    }
    // añadir el id del usuario al array de la propiedad likes
    post.likes.push(userId);

    // SIN ESTO NO SE ACTUALIZA 
    post.save()
    //devolver confirmacion
    res.status(200).json({message : 'like añadido'})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;