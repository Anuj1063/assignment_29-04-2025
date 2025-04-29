const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
  
    name:{type:String,required:true},
    price:{type:Number,required:true},
    stocks:{type:Number,required:true},
    isDeleted:{type:Boolean,default:false}
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("product",productSchema)
