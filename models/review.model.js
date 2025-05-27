const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
  
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true},
    rating:{type:Number,required:true,min:1,max:5},
    review:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    isDeleted:{type:Boolean,default:false}
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("review",reviewSchema)
