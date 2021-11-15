const { User, Item, UserItem} = require("../models")

function nextLevel(level) {
    const exponent = 1.3
    const baseXP = 100
    return (Math.floor((level ** exponent) * baseXP))
}

function addExp(level) {
    let gain = 0;
    let rng = Math.floor(Math.random() * 100)
    if(rng <= 60) {
        let baseGain = (3 * level)
        gain = Math.floor(Math.random() * baseGain + (baseGain))
    }
    if(rng > 60) {
        let baseGain = (5 * level)
        gain = Math.floor(Math.random() * baseGain + (baseGain))
    }
    if(rng > 70) {
        let baseGain = (8 * level)
        gain = Math.floor(Math.random() * baseGain + (baseGain))
    }
    if(rng > 90) {
        let baseGain = (10 * level)
        gain = Math.floor(Math.random() * baseGain + (baseGain / 4))
    }
    return (gain)
}

function addGold(level) {
    let baseGain = 2
    let rng = Math.floor(Math.random() * 100)
    if(rng <= 60) {
        baseGain = (3 * level)
    }
    if(rng > 60) {
        baseGain = (5 * level)
    }
    if(rng > 70) {
        baseGain = (7 * level)
    }
    if(rng > 95) {
       baseGain = (10 * level)
    }
    return (Math.floor(Math.random() * baseGain + (level)))
}

function chooseStepEvent() {
    let rng = Math.floor(Math.random() * 30)
    const event = {gold: false, exp: false, item: false}
    if(rng <= 10) {
        event.gold = true
    }
    else if (rng >= 10 && rng < 25) {
        event.exp = true
        event.gold = true
    }
    else {
        event.item = true
        event.exp = true
    }
    return event;
}

async function itemDrop(user) {
    const itemList = await Item.findAll()
    let rng = Math.floor(Math.random() * itemList.length)
    console.log(rng)
    const searchedItem = await UserItem.findOne({
        where: {
        userId: user.id,
        itemId: itemList[rng].id
    }})
    if(searchedItem === null) {
        const newItem = await UserItem.create({
            userId: user.id,
            itemId: itemList[rng].id
        })
        return newItem;
    }
    else {
        searchedItem.quantity += 1;
        await searchedItem.save()
        return searchedItem;
    }
}

module.exports = {
    nextLevel,
    addExp,
    addGold,
    chooseStepEvent,
    itemDrop
}