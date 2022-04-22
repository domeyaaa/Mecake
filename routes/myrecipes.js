var express = require('express');
var router = express.Router();
var monk = require('monk');
const { route } = require('./addrecipe');

// Connection URL
// const url = 'mongodb+srv://domelaz:Dome135790@cluster0.ptvky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const url = 'localhost:27017/mecake_db';

const db = monk(url);

/* GET my recipes page. */
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
                    res.render('myrecipes', { user: req.session.user, recipe: docs, recipe_by: docs1 });
                } else {
                    res.redirect('/home');
                }
            })
        } else {
            res.redirect('/home');
        }
    });
});

router.get('/delrecipe', (req, res) => {
    let id = req.query.id
    let recipes = db.get('recipes');
    recipes.remove({ _id: id })
    res.redirect('/profile');
})

module.exports = router;
