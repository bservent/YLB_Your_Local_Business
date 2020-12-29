//require('bootstrap'); 
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT 


// SET view engine
app.set('view engine', 'ejs');

// Controllers
const ctrl = require('./controllers');

//-------- MIDDLEWARE ---------------//
//Serve Styling Files
app.use(express.static(`${__dirname}/public`));

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Only save the session if a property changes
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24   // expires in 24 hrs
    }
  }));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Method Override
app.use(methodOverride('_method'));
// Logging middleware
app.use(morgan(':method : url'));


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


app.get('/aboutus', (req, res) => {
    res.render('aboutus');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.use('/businesses', ctrl.businesses);
app.use('/products', ctrl.products);
app.use('/search' , ctrl.search);
app.use('/auth',ctrl.login);

app.get('*', (req, res) => {
    res.send('<h1> Requested page not found. </h1>');
});

app.listen(PORT, () => {
    console.log(`Server is working on port: ${PORT}`);
});
