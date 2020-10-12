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

//show route
router.get('/:productId', (req, res) => {
    db.Product.findById(req.params.productId, (err, foundProduct) => {
        if (err) return console.log(err);
        res.render('products/show', {
        product: foundProduct
        });
    });
});

//create route - POST

router.post('/', (req, res) => {
    db.Product.create(req.body, (err, newProduct) => {
        db.Product.find({}, (err, allProducts) => {
            if (err) return console.log(err);
            res.render('products',{
                products: allProducts
            });
        });
    });
});


module.exports = router;