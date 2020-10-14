const express = require('express');
const router = express.Router();
//const passport = require('../server');

const bcrypt = require('bcrypt');
const db = require('../models');

const users = [];

router.get('/businesses',checkAuthenticated,(req,res)=>{
    res.render('businesses',req.user.name);
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/register',(req,res)=>{
    res.render('register');
})



router.post('/register',async (req,res)=>{
    try{
        const hashedPassword = await  bcrypt.hash(req.body.password,10);
        users.push({
            name:req.body.name,
            email: req.body.email,
            password : hashedPassword
        })
        res.redirect('/login');
    }
    catch{
        res.redirect('/register');
    }
    console.log(users);
})

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login');
}



module.exports = router;