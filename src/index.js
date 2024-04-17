require('dotenv').config();
const connectDb = require('./db/index')
const {app}  = require("./app")

connectDb()
.then(()=>{
    const port = process.env.PORT || 8000
    app.listen(port,()=>{
        console.log(`⚙️ Server is running at port : ${port}`);
    })
})
.catch((err)=>{
    console.log("mongodb connection failed ",err)
})
