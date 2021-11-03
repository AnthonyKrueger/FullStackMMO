const Sequelize = require('sequelize');
const sequelize = require("../config/connection");

const Item = sequelize.define('item', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    value: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    stat: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
})

module.exports = Item;