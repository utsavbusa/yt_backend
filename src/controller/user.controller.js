const { ApiError } = require("../utils/ApiError");

const registerUser = async (req,res,next)=>{

    // get user information 
    const {fullName,email,userName,password} = req.body;

    

    if([fullName,email,userName,password].some((field)=>field?.trim()==="")){
        const err = new ApiError(404,"all fileds are required");
        console.log(err)
        next(err)
        
    }
  

    
    //TODO validation - not empty
    //TODO check if user already exict or not 
    //TODO check for images and avtar 
    //TODO upload them in cloudinary , avtar
    //TODO create user object - create entry in db
    //TODO remove password and refrence token field from res
    //TODO check for user creation 
    //TODO return res 


}

module.exports = {
    registerUser
}