const { registerUser, loginUser } = require('../controller/user.controller');
const {upload} = require('../middleware/multer.middleware')

const router = require('express').Router();

router.route('/register').post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),registerUser)

router.route("/login").post(loginUser)

module.exports = router