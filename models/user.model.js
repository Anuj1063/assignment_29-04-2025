const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required:true, lowercase: true },
    age:{type:Number,required:true},
    userName:{type:String,required:true},
    password:{type:String,required:true},   
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
