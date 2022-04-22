const express = require('express');
var router = express.Router();
const monk = require('monk');
const md5 = require('md5');

// Connection URL
// const url = 'mongodb+srv://domelaz:Dome135790@cluster0.ptvky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const url = 'localhost:27017/mecake_db';
const db = monk(url);

router.post('/register', (req, res) => {
    let params = req.body;
    let username = params.username;
    let email = params.email;
    let password = md5(params.password1);
    let gender = params.gender;
    let users = db.get('users');
    users.find({username:username},(err,docs)=>{
        if(docs.length > 0){
            return res.render('register',{message: "ชื่อผู้ใช้ถูกใช้แล้ว"});
        }else{
            users.find({email:email},(err1,docs1)=>{
                if(docs1.length > 0){
                    return res.render('register',{message: "อีเมลถูกใช้แล้ว"});
                }else{
                    users.insert({ username: username, email: email, password: password, gender: gender, role: 'user', status: true });
                    return res.redirect('/login');
                }
            })
        }
    })
    
})

router.post('/login', (req, res) => {
    let params = req.body;
    let email = params.email;
    let password = md5(params.password);
    let users = db.get('users');
    users.findOne({ email: email, password: password, status: true }, function (err, docs) {
        if (docs) {
            req.session.user = docs;
            return res.redirect('/home');
        } else {
            res.render('login', { message: "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง!" });
        }
    })
})

module.exports = router