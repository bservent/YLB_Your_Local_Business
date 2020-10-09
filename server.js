const express = require('express');
const app = express();
const PORT = 4666;
const ctrl = require('./controllers');

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