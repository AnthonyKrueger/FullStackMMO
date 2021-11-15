const { Item } = require("../models")

const itemData = [
    {
        name: "Broadsword",
        type: "Weapon",
        stat: "STR +1",
        level: 1,
        value: 10
    },
    {
        name: "Longsword",
        type: "Weapon",
        stat: "STR +2",
        level: 1,
        value: 25
    },
    {
        name: "Dagger",
        type: "Weapon",
        stat: "STR +1",
        level: 1,
        value: 8
    },
    {
        name: "Staff",
        type: "Weapon",
        stat: "STR +3",
        level: 2,
        value: 40
    },
    {
        name: "WarHammer",
        type: "Weapon",
        stat: "STR +5",
        level: 2,
        value: 65
    },
]

const seedItems = () => Item.bulkCreate(itemData);

module.exports = seedItems;