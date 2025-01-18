const router = require("express").Router();
const Post = require("../models/Post.model");
// ==> /api/posts
router.get("/", async (req, res) => {
try {
 
  const allPosts = await Post.find()
  .populate({
    path : "author",
    select : "username profilePicture"
  })
  res.status(200).json(allPosts);
} catch (error) {
    
}
  
});

router.post("/:userId", async (req, res) => {
  try {
    
    const { author, title, content } = req.body;
    const newPost = await Post.create({
        author : author,
        title : title,
        content : content
     });
    res.status(201).json(newPost);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
