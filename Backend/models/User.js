const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {type:String, required: [true,"Please enter your full name"]},
  nickName: {type:String},
  email: { type: String, unique: true, required: [true,"Please enter email"] },
  password: { type: String, required: [true,"Please enter password"] },
  role: { type: String, default: "user" ,enum:['user','user']}, 
  gender:{type:String},
  country:{type:String},
  contactNo:{type:String},
  profilePic: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now ,immutable: true},
  occupation: { type: String, default: "" },

});

module.exports = mongoose.model("User", UserSchema);

