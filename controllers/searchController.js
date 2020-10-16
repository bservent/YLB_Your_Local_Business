const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    console.log(req.query);
    const searchString = req.query.search;
    db.Business.find({$or:[
        {name :{$regex: searchString}},{category :{$regex: searchString}},
        {businessValues :{$regex: searchString}},{owner :{$regex: searchString}}

    ]}, (err, bizResults) => {
        
        // search the products
        db.Product.find({$or:[
            {name :{$regex: searchString}},{category :{$regex: searchString}},
            {description :{$regex: searchString}}
        ]}, (err, prodResults) => {
            if (err) return console.log(err);
            
            const context ={
                results : [
                            {
                                tag: "business",
                                searchResults: bizResults
                            },
                            {
                                tag:"product",
                                searchResults : prodResults
                            }
                            ]
            };
            console.log("The product results are " , prodResults);
            console.log("The business results are ", bizResults);
            res.render('search/index', context);
        });

        
    });

    
});

module.exports = router;