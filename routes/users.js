var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next){
    if(!req.body.email){
        return res.status(400).send('Need to provide an email.')
    }
    if(!req.body.password){
        return res.status(400).send('Need to provide a password.')
    }

    if(!req.body.confirm_password){
        return res.status(400).send('Need to provide a confirm_password')
    }

    if(req.body.password != req.body.confirm_password){
        return res.status(400).send('Passwords do not match!')
    }
    models.User.create({email: req.body.email, password: req.body.password}).then(function(user, created){
        res.status(201).send('Created user')
    })
});

router.post('/login', function(req, res, next){
    console.log('Login')
    if(!req.body.email){
        return res.status(400).send('Need to provide an email')
    }
    if(!req.body.password){
        return res.status(400).send('Need to provide a password')
    }

    models.User.find({where: {email: req.body.email}}).then(function(user){
        if(!user.validPassword(req.body.password)){
            return res.status(401).send('Invalid password.')
        }
        var token = jwt.sign({id: user.id}, 'secretkey', {expiresIn: "1d"})

        return res.status(200).send({token: token})
    })
})

module.exports = router;
