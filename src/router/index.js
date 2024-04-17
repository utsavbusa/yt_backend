const router = require('express').Router();

const helthRoute = require("./helth.routes")
const userRoute = require("./user.routes")


router.use("/helth",helthRoute)
router.use("/user",userRoute)

module.exports = router