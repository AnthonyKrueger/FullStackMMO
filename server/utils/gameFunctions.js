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
    let gain = 0;
    let rng = Math.floor(Math.random() * 100)
    if(rng <= 60) {
        let baseGain = (3 * level)
        gain = Math.floor(Math.random() * baseGain + (level))
    }
    if(rng > 60) {
        let baseGain = (5 * level)
        gain = Math.floor(Math.random() * baseGain + (level))
    }
    if(rng > 70) {
        let baseGain = (7 * level)
        gain = Math.floor(Math.random() * baseGain + (level))
    }
    if(rng > 95) {
        let baseGain = (10 * level)
        gain = Math.floor(Math.random() * baseGain + (level))
    }
    return (gain)
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

module.exports = {
    nextLevel,
    addExp,
    addGold,
    chooseStepEvent
}