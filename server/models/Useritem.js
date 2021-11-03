const Sequelize = require('sequelize');
const sequelize = require('../config/connection')

const UserItem = sequelize.define('useritem', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.UUID
    },
    itemId: {
        type: Sequelize.UUID
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'useritem'
})

module.exports = UserItem;