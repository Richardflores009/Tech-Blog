const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config')

class Comment extends Model {}

Comment.init()

module.exports = Comment;