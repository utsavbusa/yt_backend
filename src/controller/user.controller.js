const { ApiError } = require("../utils/ApiError");
const {User} = require("../models/user.model");
const { uploadCloudinary } = require("../utils/cloudniry");
const ApiResponse = require("../utils/ApiResponse");


const genrateAccessAndRefershToken =async (userId,next)=>{
    try{
        const user = await User.findById(userId);
        const accessToken = User.generateAccessToken();
        const refereshToken = User.generateRefreshToken();

        user.refrenceToken = refereshToken;
        await user.save({validateBeforeSave:false})

        return {accessToken,refereshToken}
    }catch(err){
        next(new ApiError(500, "Something went wrong while generating referesh and access token"))
    }
}

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
       return next (new ApiError(409,"User width email id already exists"))
    }

    const avatarLocalPath = req.files.avatar && req.files.avatar[0] && req.files.avatar[0].path || null;
    const coverImageLocalPath = req.files.coverImage && req.files.coverImage[0] && req.files.coverImage[0].path || null;
    
    // check for images and avtar 
    if(!avatarLocalPath){
       return next(new ApiError(400,"Avatar file is required"))
    }

    // upload them in cloudinary , avtar
    const avatar = await uploadCloudinary(avatarLocalPath)

    let coverImage;
    if(coverImageLocalPath){
         coverImage = await uploadCloudinary(coverImageLocalPath)
    }

    // create user object - create entry in db
console.log("done")
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        email,
        password,
        userName:userName.toLowerCase()
    })
    
    // remove password and refrence token field from res
    const createUser = await User.findById(user._id).select(
        "-password -refrenceToken"
    )


    // check for user creation 
    if(!createUser){
        next(new ApiError(500,"something went wrong while registring user"))
    }

    // return res 
    return res.status(200).json(new ApiResponse(200,createUser,"User register successfully"))



}

const loginUser = async (req,res,next)=>{


    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email,userName,password} = req.body;


    if(!email || !userName){
        return next(new ApiError(400,"User or email addresss required"))
    }

    const user = await User.findOne({
        $or:[{email},{userName}]
    })

    if(!user){
        return next(new ApiError(404,"User does't found"))
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        return next(new ApiError(404,"Invalid user password"))
    }


    const {accessToken,refereshToken}  = genrateAccessAndRefershToken(user._id,next)

    const loginUser = await User.findById(user._id).select("-password -refrenceToken")

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
            .status(200)
            .cokkie("accessToken",accessToken,options)
            .cokkie("refereshToken",refereshToken,options)
            .json(new ApiResponse(200,{user:loginUser,accessToken,refereshToken},"User login successfully"))

}

module.exports = {
    registerUser,
    loginUser
}