const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment.model');
const { verifyToken } = require('../middlewares/auth.verify');

// ==> /api/comments/:postId
router.get("/:postId", async (req, res ) => {

    try {
        const { postId } = req.params
        const comments = await Comment.find({ post: postId })
        res.status(200).json(comments)
        console.log(comments)
    } catch (error) {
        console.log(error)
    }

    //res.status(200).json({message: "comments data"});
});

// ==> /api/comments/:postId/:authorId
// CREA UN COMENTARIO EN UN POST
router.post("/:postId/:authorId", verifyToken ,async (req, res) => {
    
try{
    const { postId } = req.params

    const { content } = req.body
   
    const { authorId } = req.params
    
    const newComment = await Comment.create({
        content : content,
        author: authorId,
        post: postId
    })
console.log(newComment)
    res.status(201).json(newComment)
   } catch (e) {
    console.log(e)
    
   }
})

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