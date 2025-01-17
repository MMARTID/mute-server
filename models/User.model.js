const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    email: {
      type: String,
      //required: [true, 'Email is required.'],
      
    },
    password: {
      type: String,
      //required: [true, 'Password is required.']
    },
    username: {
      type: String,
    },
    profilePicture:{
      type: String,
      default: 'default-profile-pic.jpg'
    },
    role: {
      type: String,
      enum: ['user', 'admin'], 
      default: 'user'
    }
},
  { timestamps : true }
);

const User = model("User", userSchema)

module.exports = User
