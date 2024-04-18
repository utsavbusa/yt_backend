const mongoose = require('mongoose')
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2")
// mongoose-aggregate-paginate-v2 --- use when we need paggination after aggreagte result
const videoSchema = mongoose.Schema({
    videoFile:{
        type:String, // cloudenairy url 
        require:true
    },
    thumbnail:{
        type:String,    // cloudenairy url
        require:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },  
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    duration:{
        type:Number,
        require:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

videoSchema.plugin(mongooseAggregatePaginate)

module.exports.Video = mongoose.model("Video",videoSchema)