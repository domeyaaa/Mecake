var express = require('express');
var router = express.Router();
var monk = require('monk')

// Connection URL
// const url = 'mongodb+srv://domelaz:Dome135790@cluster0.ptvky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const url = 'localhost:27017/mecake_db';
const db = monk(url);

/* GET manage post page. */
router.get('/', function (req, res) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    let recipes = db.get('recipes')
    recipes.find({},function(err,docs){
        recipes.count({},function(err1,docs1){
            res.render('profile_manage_post', { user: req.session.user,recipes:docs,num:docs1 });
        })
    })

});

router.get('/delrecipe', (req, res) => {
    let id = req.query.id
    let recipes = db.get('recipes');
    recipes.remove({ _id: id })
    res.redirect('/managepost');
})

module.exports = router;
