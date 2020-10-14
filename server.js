require('dotenv').config();
//require('bootsrap');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const ctrl = require('./controllers');
const PORT = process.env.PORT || 4666;
const bodyparser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');
initializePassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);
const users = [];


// Connect to the db
const db = require('./models');

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

//Add Styling
app.use(express.static(`${__dirname}/public`));

//Custom middleware
app.use((req, res, next) => {
    const method = req.method;
    const path = req.url;
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${method} ${path} ${timestamp}`);
    next(); // Allow the request to move on to the next middleware in the chain
  });

app.get('/', (req, res) => {
    res.render('home');
});

// Route for passport authentication
app.post('/login',passport.authenticate('local',{
    successRedirect: '/businesses',
    failureRedirect : '/login',
    failureFlash : true
}))

app.use('/businesses', ctrl.businesses);
app.use('/products', ctrl.products);
app.use('/search' , ctrl.search);
app.use('/',ctrl.login);

app.get('*', (req, res) => {
    res.send('<h1> Requested page not found. </h1>');
});

app.listen(PORT, () => {
    console.log(`Server is working on port: ${PORT}`);
});

module.exports = passport;