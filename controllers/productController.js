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
    db.Business.find({},(err,allBusinesses)=>{
        if(err) return console.log(err);
        res.render('products/new',{
            businesses : allBusinesses
        });
    })
    
});

//show route - GET products
router.get('/:productId', (req, res) => {
    db.Product.findById(req.params.productId)
        .populate('business')
        .exec((err, foundProduct) => {
            if (err) return console.log(err);
        res.render('products/show', {
        product: foundProduct
        });
    });
});

//create route - POST products
router.post('/', (req, res) => {
        db.Product.create(req.body, (err, newProduct) => {
            console.log(req.body);
            if(err) return console.log(err);
            db.Business.findById(req.body.business,(err,foundBusiness)=>{
                if(err) return console.log(err);
                foundBusiness.products.push(newProduct._id);
                foundBusiness.save((err,saveBusiness)=>{
                    if(err) return console.log(err);
                    res.redirect(`/products/${newProduct._id}`);
                })

            });        
    });
});

// edit route - Get
router.get('/:productId/edit', (req,res) => {
    db.Product.findById(req.params.productId, 
        (err, foundProduct) => {
        if(err) return console.log(err);
        res.render('products/edit', {
            product: foundProduct
        });
    });
});

//edit route - Put
router.put('/:productId', (req,res) => {
    db.Product.findByIdAndUpdate(req.params.productId,
        req.body, 
        {new:true},
        (err,updatedProduct) => {
            if(err) return console.log(err)
            res.redirect(`/products/${updatedProduct._id}`);     
        });
});

//delete route
router.delete('/:productId', (req, res) => {
    db.Product.findByIdAndDelete(req.params.productId, 
        (err, deletedProduct) => {
        if (err) return console.log(err);
        res.redirect('/products');
    });
});

module.exports = router;