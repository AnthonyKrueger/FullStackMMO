const { Item } = require("../models")

const itemData = [
    {
        name: "Broadsword",
        type: "Weapon",
        stat: "STR +1"
    },
    {
        name: "Longsword",
        type: "Weapon",
        stat: "STR +2"
    },
    {
        name: "Dagger",
        type: "Weapon",
        stat: "STR +1"
    },
    {
        name: "Staff",
        type: "Weapon",
        stat: "STR +3"
    },
    {
        name: "WarHammer",
        type: "Weapon",
        stat: "STR +5"
    },
]

const seedItems = () => Item.bulkCreate(itemData);

module.exports = seedItems;