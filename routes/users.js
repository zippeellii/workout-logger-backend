var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next){
    if(!req.body.email){
        res.status(400).send('Need to provide an email.')
    }
    if(!req.body.password){
        res.status(400).send('Need to provide a password.')
    }

    if(!req.body.confirm_password){
        res.status(400).send('Need to provide a confirm_password')
    }

    if(req.body.password != req.body.confirm_password){
        res.status(400).send('Passwords do not match!')
    }
    models.User.create({email: req.body.email}).then(function(user, created){
        res.status(201).send('Created user')
    })
});

module.exports = router;
