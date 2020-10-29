const { Model, DaataTypes} = require('sequelize');
const sequelize = require('../config/config')

class Vote extends Model {}

Vote.init()

module.exports = Vote;