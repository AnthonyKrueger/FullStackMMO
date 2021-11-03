const User = require("./User");
const Item = require("./Item");
const UserItem = require("./Useritem");

Item.belongsToMany(User, {through: UserItem, unique: false})
User.belongsToMany(Item, {through: UserItem, unique: false})

// User.hasMany(UserItem);
// UserItem.belongsTo(User);
// Item.hasMany(UserItem);
// UserItem.belongsTo(Item);

module.exports = {User, Item, UserItem};