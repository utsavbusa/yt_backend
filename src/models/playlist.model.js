const mongoose = require('mongoose')

const playlistSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
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

module.exports.playlist = mongoose.model("Playlist",playlistSchema)