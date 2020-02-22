var express = require('express');
var router  = express.Router();

var password_controller = require('../controllers/password_controller');

router.get('/', password_controller.index);

module.exports = router;