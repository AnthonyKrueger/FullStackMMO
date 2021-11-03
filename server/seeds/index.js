const sequelize = require('../config/connection');

const seedUsers = require("./userSeeds");
const seedItems = require("./itemSeeds");

const seedAll = async () => {
    await seedUsers()
    seedItems();
}

module.exports = seedAll;