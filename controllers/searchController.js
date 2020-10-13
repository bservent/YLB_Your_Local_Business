const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/:searchString', (req, res) => {
    const searchString = req.params.searchString;
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
            //console.log("the busines results are " , bizResults);
            console.log("The product results are " , prodResults);
            res.render('search/index', context);
            //res.render('search/index', context);
        });

        
    });

    
});

module.exports = router;