require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const ctrl = require('./controllers');
const PORT = process.env.PORT || 4666;

// Connect to the db
const db = require('./models');

app.use(bodyParser.urlencoded({extended: false}));

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