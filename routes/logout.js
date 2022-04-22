var express = require('express');
var router = express.Router();

/* GET logout */
router.get('/', function(req, res) {
    req.session.destroy();
   res.redirect('/login');
});

module.exports = router;
