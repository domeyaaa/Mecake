var express = require('express');
var router = express.Router();
var monk = require('monk')

const url = 'localhost:27017/mecake_db';
const db = monk(url);

/* GET Edit Profile page. */
router.get('/', function (req, res) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('editprofile', { user: req.session.user });
});

router.post('/update', (req, res) => {

  let users = db.get('users');
  let params = req.body;
  let id = req.query.id;

  if (!req.session.user) {
    return res.redirect('/login');
  }

  users.update({
    _id: id
  }, {
    $set: {
      username: params.username,
      gender: params.gender
    }
  })

  users.findOne({ _id: id }, (err1, docs1) => {
    console.log(docs1)
    req.session.user = docs1
    console.log(req.session.user)
    res.redirect('/profile');

  })
})

module.exports = router;
