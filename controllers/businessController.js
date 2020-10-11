const express = require('express');
const router = express.Router();
const db = require('../models');

const db = require('../models');
const Business = require('../models/Business');

//index route
router.get('/', (req, res) => {
<<<<<<< HEAD
    db.Business.find({},(err,allBusinesses)=>{
        res.render('businesses/index',{
            businesses:allBusinesses
=======
    db.Business.find({}, (err, allBusinesses) => {
    if (err) return console.log(err);
    res.render('businesses/index', {
        businesses: allBusinesses
        });
    });
});

//create route
router.get('/new', (req,res) => {
    res.render('businesses/new');
});

//show route
router.get('/:businessId', (req, res) => {
    db.Business.findById(req.params.businessId, (err, foundBusiness) => {
        if (err) console.log(err);
        res.render('businesses/show', {
            business: foundBusiness
>>>>>>> submaster
        });
    })
})

<<<<<<< HEAD
router.get('/new',(req,res)=>{
    res.render('businesses/new');
});
=======

/* router.post('/', (req, res) => {
    db.Business.create(req.body, (err, newBusiness) => {
        if (err) return console.log(err);
    });
    res.redirect(`/businesses/${newBusiness._id}`);
}); */
>>>>>>> submaster

router.post('/',(req,res)=>{
    console.log(req.body);
    db.Business.create(req.body,(err,createdBusiness)=>{
        db.Business.find({},(err,allBusinesses)=>{
            res.render('businesses',{
                businesses: allBusinesses
            })
<<<<<<< HEAD

        })

=======
        })
>>>>>>> submaster
    })
});

module.exports = router;