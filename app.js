var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var app = express();
// const port=process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server started on port`);
// });

app.use(cookieParser());
app.use(
    session({
        secret: 'mecakesecret',
        resave: false,
        saveUninitialized: false,
    })
);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var authRouter = require('./routes/auth');
var homeRouter = require('./routes/home');
var logoutRouter = require('./routes/logout');
var addrecipeRouter = require('./routes/addrecipe');
var profileRouter = require('./routes/profile');
var editprofileRouter = require('./routes/editprofile');
var managepostRouter = require('./routes/managepost');
var manageuserRouter = require('./routes/manageuser');
var myrecipesRouter = require('./routes/myrecipes');
var recipeRouter = require('./routes/recipe');
var editrecipeRouter = require('./routes/editrecipe');

const monk = require('monk')

// Connection URL
const url = 'localhost:27017/mecake_db';
const db = monk(url);
db.then(() => {
  console.log('Connected correctly to database server')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/auth',authRouter);
app.use('/home',homeRouter);
app.use('/logout',logoutRouter);
app.use('/addrecipe',addrecipeRouter);
app.use('/profile',profileRouter);
app.use('/editprofile',editprofileRouter);
app.use('/managepost',managepostRouter);
app.use('/manageuser',manageuserRouter);
app.use('/myrecipe',myrecipesRouter);
app.use('/recipe',recipeRouter);
app.use('/editrecipe',editrecipeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
