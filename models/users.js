"use strict";

var bcrypt = require('bcrypt-nodejs')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.beforeCreate(function(user, options) {
    console.log('In the before create')
    var hash = bcrypt.hashSync(user.password, null, null)
        console.log('THIS IS THE HASH', hash)
        user.password = hash;
        console.log('USER', user)
})

  return User;
};