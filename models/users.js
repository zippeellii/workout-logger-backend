"use strict";

var passwordHash = require('password-hash')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    }
  },
  {
      instanceMethods: {
        validPassword: function(password){
            return passwordHash.verify(password, this.password)
        }
      }
  });

    User.beforeCreate(function(user, options) {
        console.log(user.password)
        var hash = passwordHash.generate(user.password)
        user.password = hash;
    })

  return User;
};
