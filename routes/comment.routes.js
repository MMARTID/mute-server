const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment.model');
const { verifyToken } = require('../middlewares/auth.verify');
const { default: mongoose } = require('mongoose');

// ==> /api/comments/:postId

// ==> /api/comments/:postId/:authorId
// CREA UN COMENTARIO EN UN POST
router.post("/:postId", verifyToken, async (req, res) => {
    try {
      console.log(req.params)
      const { content } = req.body; // El contenido del comentario
      const authorId = req.payload._id; // ID del autor
 

  
      // Crear el comentario
      const newComment = await Comment.create({
        content,
        author: authorId,
        post: req.params.postId,
      });
  
      res.status(201).json(newComment);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal server error" });
    }
  });
router.get("/:postId",verifyToken, async (req, res, next ) => {

    try {
        console.log(req.params.postId)
        const comments = await Comment.find({"post" : `${req.params.postId}`})
        .select('content author')
        .populate({
            path: "post",
            select: "author" 
        }).populate({
            path:"author"
        })
        
        res.status(200).json(comments)
        
    } catch (error) {
        next(error)
    }
    //res.status(200).json({message: "comments data"});
   
});

router.delete("/:commentId", verifyToken, async (req, res) => {
    try {
        const { _id: callerId } = req.payload
        const { commentId } = req.params

        const deletedComment = await Comment.findByIdAndDelete(commentId)
        if (!deletedComment) {
            res.status(404).json({ message: "Comment not found" })
            return
        }
        if (deletedComment.author.toString() !== callerId) {
            res.status(401).json({ message: "Solo puedes eliminar tus comentarios :( " })
            return
        }
        res.status(200).json(deletedComment)
    } catch (e) {
        console.log(e)
    }
})
module.exports = router