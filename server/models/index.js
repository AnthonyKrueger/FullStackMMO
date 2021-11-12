const User = require("./User");
const Item = require("./Item");
const UserItem = require("./Useritem");

// Item.belongsToMany(User, {through: UserItem})
// User.belongsToMany(Item, {through: UserItem})
User.hasMany(UserItem);
UserItem.belongsTo(User);
Item.hasMany(UserItem);
UserItem.belongsTo(Item);

module.exports = {User, Item, UserItem};