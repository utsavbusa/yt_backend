const helthcheck = (req,res)=>{
    res.status(200).json({
        status:"ok",
        mesage:"server is working fine"
    })
}

module.exports = {
    helthcheck
}