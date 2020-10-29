const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/config')

class Post extends Model {}

Post.init()

module.exports = Post;