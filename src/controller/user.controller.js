const { ApiError } = require("../utils/ApiError");
const {User} = require("../models/user.model");
const { uploadCloudinary } = require("../utils/cloudniry");

const registerUser = async (req,res,next)=>{

    // get user information 
    const {fullName="",email="",userName="",password=""} = req.body;

    
    
    // validation - not empty
    if([fullName,email,userName,password].some((field)=>field?.trim()==="")){
        const err = new ApiError(404,"all fileds are required");
        next(err)
    }
  
    //check if user already exict or not 
    const exictUser = await User.findOne({
        $or:[{userName},{email}]
    })

    if(exictUser){
        next (new ApiError(409,"User width email id already exists"))
    }

    console.log(req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path || "";
    
    // check for images and avtar 
    if(!avatarLocalPath){
        next(new ApiError(400,"Avatar file is required"))
    }

    // upload them in cloudinary , avtar
    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = {
        url:""
    }
    if(converImageLocalPath){
        coverImage = await uploadCloudinary(coverImageLocalPath)
    }



    //TODO create user object - create entry in db
    //TODO remove password and refrence token field from res
    //TODO check for user creation 
    //TODO return res 


}

module.exports = {
    registerUser
}