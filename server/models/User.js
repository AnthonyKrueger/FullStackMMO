const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [6]
        }
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    strength: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    endurance: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    speed: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    experience: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    gold: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    health: {
        type: Sequelize.INTEGER,
        defaultValue: 10
    },
    maxhealth: {
        type: Sequelize.INTEGER,
        defaultValue: 10
    },
}, {
    hooks: {
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = User;