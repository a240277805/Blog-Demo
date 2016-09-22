var express = require('express');
var router = express.Router();
var myrouter = require("./myrouter");


/* GET home page. */
router.get('/', myrouter.index);
// router.get('/user/:user', myrouter.user);
router.post('/post', myrouter.post);

router.get('/login', myrouter.Login);
router.post('/login', myrouter.doLogin);

router.get('/reg', myrouter.Reg);
router.post('/reg',myrouter.doReg);

router.get('/logout', myrouter.Logout);

module.exports = router;
