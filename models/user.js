'use strict';
const { hashingPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */



    static associate(models) {
      // define association here
    }
  };
  User.init({
    username:{
    type: DataTypes.STRING,
    validate:{
      isUniqueUsername: function(newUserName){
        return User.findOne({
          where:{
            username: newUserName
          }
        }).then(function(user){
          if(user){
            throw(`Username sudah dipakai`)
          }
        })
      }
    }
  },
    email:{
      type: DataTypes.STRING,
      validate:{
        isUniqueEmail: function(newEmail){
          return User.findOne({
            where:{
              email: newEmail
            }
          }).then(function(user){
            if(user){
              throw(`Email sudah dipakai`)
            }
          })
        }
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  },
  // , 
  {
    hooks: {
      beforeCreate(user) {
        user.password = hashingPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });

  //method 3
  User.beforeCreate(async (user, options) => {
    user.username = user.username.toLowerCase();
  });
  

  return User;
};