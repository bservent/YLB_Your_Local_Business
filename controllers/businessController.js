const express = require('express');
const router = express.Router();
const db = require('../models');

//index route
router.get('/', (req, res) => {
    db.Business.find({}, (err, allBusinesses) => {
    if (err) return console.log(err);
    res.render('businesses/index', {
        businesses: allBusinesses
        });
    });
});

//create route - GET
router.get('/new', (req,res) => {
    res.render('businesses/new');
});

//show route
router.get('/:businessId', (req, res) => {
    db.Business.findById(req.params.businessId, (err, foundBusiness) => {
        if (err) console.log(err);
        res.render('businesses/show', {
            business: foundBusiness
        });
    })
})

// create route - POST
router.post('/',(req,res)=>{
     // Set fields for address
   req.body.address = {
    streetNumber : req.body.streetNumber,
    streetName: req.body.streetName,
    city: req.body.city,
    state: req.body.states,
  }
  // delete the exitsing fields since address is build as new key value pair
    delete req.body.streetNumber;
    delete req.body.streetName;
    delete req.body.city;
    delete req.body.states;
    console.log(req.body);
    db.Business.create(req.body,(err,createdBusiness)=>{
        db.Business.find({},(err,allBusinesses)=>{
            res.render('businesses',{
                businesses: allBusinesses
            })
        })
    })
});

// edit route - GET
router.get('/:businessId/edit',(req,res)=>{
    console.log("we hit the edit route");
    db.Business.findById(req.params.businessId,(err,foundBusiness)=>{
        console.log(foundBusiness);
        if(err) return console.log(err);
        res.render('businesses/edit', {
            business: foundBusiness
        });
    })
})

// edit route - PUT
router.put('/:businessId',(req,res)=>{
    db.Business.findByIdAndUpdate(req.params.businessId,req.body,{new:true},
        (err,updatedBusiness)=>{
            if(err) return console.log(err)
            res.redirect(`/business/${updatedBusiness._id}`);     
        })
})

module.exports = router;