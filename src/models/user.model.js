const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        require:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        require:true
    },
    coverImage:{
        type:String
    },
    watchHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"video"
        }
    ],
    password:{
        type:String,
        require:[true,"password is required"]
    },
    refrenceToken:{
        type:String
    }
},{
    timestamps:true
})

module.exports.user = mongoose.model("User",userSchema)