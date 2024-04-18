const mongoose = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2")

const commentSchema = mongoose.Schema({
    content:{
        type:String,
        require:true,
        trim:true
    },
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

commentSchema.plugin(mongooseAggregatePaginate)

module.exports.Comment = mongoose.model("Comment",commentSchema)