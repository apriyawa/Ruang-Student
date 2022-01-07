'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get formattedDuration () {
      return `${this.duration} Jam`;
    } 


    static associate(models) {
      // define association here
      Course.belongsTo(models.Category, {foreignKey: "CategoryId"})

    }

    static getCourse(data){
      return Course.findAll({
        where: {
          id : data
        }
      })
    }
  };
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};