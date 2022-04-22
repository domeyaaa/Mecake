var express = require('express');
var router = express.Router();
var monk = require('monk')
var {ObjectId} = require('mongodb')

// Connection URL
// const url = 'mongodb+srv://domelaz:Dome135790@cluster0.ptvky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const url = 'localhost:27017/mecake_db';
const db = monk(url);

/* GET profile page. */
router.get('/', function (req, res) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  let userSess = req.session.user;
  
  let recipes = db.get('recipes');

  recipes.find({ recipe_by: ObjectId(userSess._id) }, function (err, docs) {
    if (docs) {
      recipes.count({recipe_by: ObjectId(userSess._id)},function(err,docs1){
        if(docs){
          res.render('profile', { user: req.session.user, allmyrecipes: docs,num:docs1 });
        }
      })
    }
  });

});

module.exports = router;
