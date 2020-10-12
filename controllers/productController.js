const express = require('express');
const router = express.Router();
const db = require('../models');

//index route

router.get('/', (req, res) => {
    db.Product.find({}, (err, allProducts) => {
    if (err) return console.log(err);
    res.render('products/index', {
        products: allProducts
        });
    });
});

//create route - GET
router.get('/new', (req, res) => {
    res.render('products/new');
});

module.exports = router;