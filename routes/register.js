var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function (req, res, next) {

  if (req.session.user) {
    res.redirect('/home');
  }

  res.render('register');
});

module.exports = router;
