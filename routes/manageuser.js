var express = require('express');
var router = express.Router();
var monk = require('monk')

// Connection URL
// const url = 'mongodb+srv://domelaz:Dome135790@cluster0.ptvky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const url = 'localhost:27017/mecake_db';
const db = monk(url);

/* GET manage user page. */
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    let users = db.get('users')
    users.find({ status: true, role: 'user' }, function (err, docs) {
        users.count({}, function (err1, docs1) {
            res.render('profile_manage_user', { user: req.session.user, alluser: docs, num: docs1 });
        })
    });
});

router.get('/removeuser', (req, res) => {
    let users = db.get('users')
    let id = req.query.id
    users.update(
        {
            _id: id
        },
        {
            $set: {
                status: false
            }
        }
    )
    res.redirect('/manageuser');
});

module.exports = router;
