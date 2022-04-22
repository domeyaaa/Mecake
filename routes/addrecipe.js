var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const monk = require('monk');
var { ObjectId } = require('mongodb')
var { Timestamp } = require('mongodb')
var moment = require('moment')


// Connection URL
// const url = 'mongodb+srv://domelaz:Dome135790@cluster0.ptvky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const url = 'localhost:27017/mecake_db';
const db = monk(url);

let date = moment().format('MMMM Do YYYY');
let pic_name = ""

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/post")
  },
  filename: (req, file, cb) => {
    if (file.originalname != "") {
      pic_name = file.originalname;
      cb(null, pic_name)
    }
  }
})

const upload = multer({ storage: storage })

/* GET addrecipe page. */
router.get('/', function (req, res) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('addrecipe', { user: req.session.user });
});


router.post('/uploadrecipe', upload.single('inpFile'), (req, res) => {

  let userSess = req.session.user;
  let params = req.body
  let recipe_name = params.recipe_name
  let ingredients = params.ingredients
  let recipe = params.recipe
  let category = params.category

  let recipes = db.get('recipes');
  recipes.insert({ category: category, recipe_name: recipe_name, cake_pic: pic_name, ingredients: ingredients, recipe: recipe, date: date, recipe_by: ObjectId(userSess._id) })

  pic_name = ""
  res.redirect('/addrecipe/savesuccess');
})

router.get('/savesuccess', (req, res) => {

  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('savesuccess', { user: req.session.user });
})

module.exports = router;
