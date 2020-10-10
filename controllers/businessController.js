const express = require('express');
const router = express.Router();

const db = require('../models');
const Business = require('../models/Business');

//index route
router.get('/', (req, res) => {
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



module.exports = router;