const { helthcheck } = require('../controller/helthcheck.controller');

const router = require('express').Router();


router.route('/').get(helthcheck)


module.exports = router;