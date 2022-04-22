var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res, next) {

  if (req.session.user) {
    res.redirect('/home');
  }

  res.render('login');
});

module.exports = router;
