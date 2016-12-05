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
        res.status(400).send('Need to privide a password.')
    }
    models.User.create({email: req.body.email}).success(function(user, created){
        console.log('req.body.email', req.body.email)
        console.log('CREATED', created)
        console.log(user)
        res.send('Created user')
    })
});

module.exports = router;
