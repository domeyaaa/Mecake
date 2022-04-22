var express = require('express');
var router = express.Router();
var monk = require('monk')

// Connection URL
// const url = 'mongodb+srv://domelaz:Dome135790@cluster0.ptvky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const url = 'localhost:27017/mecake_db';

const db = monk(url);

/* GET home page. */
router.get('/', function (req, res) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  let recipes = db.get('recipes')
  recipes.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'recipe_by',
        foreignField: '_id',
        as: 'userData'
      }
    },
    {
      $sort:{
        _id:-1
      }
    }
  ]).then((docs) => {
    res.render('home', { user: req.session.user, allcake: docs })
  })
})

router.get('/buttercake',(req,res)=>{
  if (!req.session.user) {
    return res.redirect('/login');
  }

  let recipes = db.get('recipes')
  recipes.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'recipe_by',
        foreignField: '_id',
        as: 'userData'
      }
    },
    {
      $sort:{
        date:1
      }
    },
    {
      $match:{
        category:"บัตเตอร์เค้ก"
      }
    }
  ]).then((docs) => {
    res.render('home', { user: req.session.user, allcake: docs,active:'active1' })
  })
  
})

router.get('/cheesecake',(req,res)=>{
  if (!req.session.user) {
    return res.redirect('/login');
  }

  let recipes = db.get('recipes')
  recipes.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'recipe_by',
        foreignField: '_id',
        as: 'userData'
      }
    },
    {
      $sort:{
        date:1
      }
    },
    {
      $match:{
        category:"ชีสเค้ก"
      }
    }
  ]).then((docs) => {
    res.render('home', { user: req.session.user, allcake: docs,active:'active2' })
  });
});

router.get('/redvelvetcake',(req,res)=>{
  if (!req.session.user) {
    return res.redirect('/login');
  }

  let recipes = db.get('recipes')
  recipes.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'recipe_by',
        foreignField: '_id',
        as: 'userData'
      }
    },
    {
      $sort:{
        date:1
      }
    },
    {
      $match:{
        category:"เรดเวลเวตเค้ก"
      }
    }
  ]).then((docs) => {
    res.render('home', { user: req.session.user, allcake: docs,active:'active3' })
  });
});

router.get('/spongecake',(req,res)=>{
  if (!req.session.user) {
    return res.redirect('/login');
  }

  let recipes = db.get('recipes')
  recipes.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'recipe_by',
        foreignField: '_id',
        as: 'userData'
      }
    },
    {
      $sort:{
        date:1
      }
    },
    {
      $match:{
        category:"สปันจ์เค้ก"
      }
    }
  ]).then((docs) => {
    res.render('home', { user: req.session.user, allcake: docs,active:'active4' })
  });
});

router.get('/chiffoncake',(req,res)=>{
  if (!req.session.user) {
    return res.redirect('/login');
  }

  let recipes = db.get('recipes')
  recipes.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'recipe_by',
        foreignField: '_id',
        as: 'userData'
      }
    },
    {
      $sort:{
        date:1
      }
    },
    {
      $match:{
        category:"ชิฟฟอนเค้ก"
      }
    }
  ]).then((docs) => {
    res.render('home', { user: req.session.user, allcake: docs,active:'active5' })
  });
});

router.get('/flourcake',(req,res)=>{
  if (!req.session.user) {
    return res.redirect('/login');
  }

  let recipes = db.get('recipes')
  recipes.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'recipe_by',
        foreignField: '_id',
        as: 'userData'
      }
    },
    {
      $sort:{
        date:1
      }
    },
    {
      $match:{
        category:"เค้กไร้แป้ง"
      }
    }
  ]).then((docs) => {
    res.render('home', { user: req.session.user, allcake: docs,active:'active6' })
  });
});

router.get('/fruitcake',(req,res)=>{
  if (!req.session.user) {
    return res.redirect('/login');
  }

  let recipes = db.get('recipes')
  recipes.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'recipe_by',
        foreignField: '_id',
        as: 'userData'
      }
    },
    {
      $sort:{
        date:1
      }
    },
    {
      $match:{
        category:"เค้กผลไม้"
      }
    }
  ]).then((docs) => {
    res.render('home', { user: req.session.user, allcake: docs,active:'active7' })
  });
});




module.exports = router;
