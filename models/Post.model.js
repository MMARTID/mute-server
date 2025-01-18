const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // relación con user
      required: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // relación con el modelo de usuario para saber quién y cuantos han dado like
      }
    ],
    type: {
      type: String,
      enum: ['general', 'private'],
      default: 'general' 
    }
  },
  { timestamps: true } 
);

const Post = mongoose.model("Post", postSchema)

module.exports = Post