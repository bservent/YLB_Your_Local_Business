const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.Business.find({},(err,allBusinesses)=>{
        res.render('businesses/index',{
            businesses:allBusinesses
        });
    })
})

router.get('/new',(req,res)=>{
    res.render('businesses/new');
});

router.post('/',(req,res)=>{
    console.log(req.body);
    db.Business.create(req.body,(err,createdBusiness)=>{
        db.Business.find({},(err,allBusinesses)=>{
            res.render('businesses',{
                businesses: allBusinesses
            })

        })

    })
});

module.exports = router;