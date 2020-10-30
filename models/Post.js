const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        //table definitions
    },
    {
        //table configuration options
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;