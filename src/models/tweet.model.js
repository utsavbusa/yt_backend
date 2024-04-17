const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports.tweet = mongoose.model("Tweet",tweetSchema);