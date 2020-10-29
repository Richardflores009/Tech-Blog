const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/config')

class User extends Model {}

User.init()

module.exports = User;