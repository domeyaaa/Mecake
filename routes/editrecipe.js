var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
var monk = require('monk')
var { ObjectId } = require('mongodb');
const e = require('express');

// Connection URL
// const url = 'mongodb+srv://domelaz:Dome135790@cluster0.ptvky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const url = 'localhost:27017/mecake_db';
const db = monk(url);

let date = Date.now()
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

/* GET Edit Recipe page. */
router.get('/', function (req, res) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    let id = req.query.id
    let recipes = db.get('recipes')

    recipes.findOne({ _id: id }, function (err, docs) {
        if (docs) {
            let users = db.get('users')
            users.findOne({ _id: docs.recipe_by }, function (err1, docs1) {
                if (docs1) {
                    res.render('editrecipe', { user: req.session.user, recipe: docs, recipe_by: docs1 });
                } else {
                    res.redirect('/home');
                }
            })

        } else {
            res.redirect('/home');
        }
    });
});

router.post('/update', upload.single('inpFile'), (req, res) => {

    let recipes = db.get('recipes')
    let params = req.body
    let id = req.query.id
    let recipe_name = params.recipe_name
    let category = params.category
    let ingredients = params.ingredients
    let recipe = params.recipe
    console.log()
    recipes.update(
        {
            _id: id
        },
        {
            $set: {
                recipe_name: recipe_name,
                category: category,
                ingredients: ingredients,
                recipe: recipe,
            }
        }
    )
    if(pic_name != ""){
        recipes.update(
            {
                _id: id
            },
            {
                $set: {
                    cake_pic: pic_name
                }
            }
        )
    }
    pic_name = ""
    res.redirect('/profile')
});

module.exports = router;
