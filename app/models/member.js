const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class Member extends Model {};

Member.init({
  firstname: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  },
  lastname: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  },
  email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
          notEmpty: true
      }
  },
  birthdate : {
      type : DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
    }
  },
  user_password : {
    type : DataTypes.TEXT,
    allowNull: false,
    validate: {
        notEmpty: true
    }
  },
  user_description: {
    type : DataTypes.TEXT,
    allowNull: true,
  },
  profil_image : {
    type : DataTypes.TEXT,
    allowNull: true,
  },
  city_id : {
  type: DataTypes.INTEGER,
  allowNull: false,
      references: {
          model: 'City',
          key: 'id'
      }
 },
}, {
  defaultScope: {
    include: [{
      association: 'instruments',
      include: 'instrument_level'
    }],
     
  },
  sequelize: database,
  tableName: "member"
  
});

module.exports = Member;