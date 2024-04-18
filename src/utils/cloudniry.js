const cloudinary = require('cloudinary').v2;
const fs = require('fs')

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNIRY_CLOUD_NAME, 
  api_key: process.env.CLOUDNIRY_CLOUD_API_KEY, 
  api_secret: process.env.CLOUDNIRY_CLOUD_API_SECRET
});

const uploadCloudinary  = async (localFilePath)=>{
    try{
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        console.log("file has successfully uploaded",response.url)

        fs.unlinkSync(localFilePath);
        return response;
    
    }catch(err){
        fs.unlinkSync(localFilePath);
        return null;
    }
}

module.exports = {uploadCloudinary}