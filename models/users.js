"use strict";

var bcrypt = require('bcrypt-nodejs')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    }
  });

  User.beforeCreate(function(user, options) {
    var hash = bcrypt.hashSync(user.password, null, null)
        user.password = hash;
})

  return User;
};