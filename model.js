import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    src:{type:String,required:true},
    channel:{type:String,required:true},
    description:{type:String,required:true},
    like:{type:Number,required:true},
    comment:{type:Number},
    share:{type:Number}

})
const video = mongoose.model('video',videoSchema)

export default video;