const express = require('express');
const app = express();
const methodOverride = require('method-override');
const ctrl = require('./controllers');
require('dotenv').config();
const PORT = process.env.PORT || 4666;
const bodyparser = require('body-parser');

// Connect to the db
const db = require('./models');

// MIDDLEWARE
app.use(bodyparser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('<h1> THIS IS HOME </h1>');
});

app.use('/business', ctrl.businesses);

app.get('*', (req, res) => {
    res.send('<h1> Requested page not found. </h1>');
});

app.listen(PORT, () => {
    console.log(`Server is working on port: ${PORT}`);
});