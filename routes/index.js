var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
     res.redirect('/home');
  }
  res.render('index');
});

module.exports = router;
