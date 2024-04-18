const mongoose = require('mongoose');
const { DB_NAME } =require( './../constant');

const connectDb = async () =>{
    try{
    
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);          

        console.log(`\n mongodb connected !! db host ${connectionInstance.connection.host}`)

    }catch(error){
        console.log("Mongodb connection failed :",error)
        process.exit(1)
    }
}

module.exports = connectDb