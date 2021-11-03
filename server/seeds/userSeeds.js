const { User } = require("../models")

const userData = [
    {
        username: "warriordude",
        password: "password1",
        email: "a@a.com"
    },
    {
        username: "magedude",
        password: "password1",
        email: "b@a.com"
    },
    {
        username: "roguedude",
        password: "password1",
        email: "c@a.com"
    },
]

const seedUsers = async () => {  
    // Using multiple creates so the password gets hashed
 await User.create(userData[0]);
 await User.create(userData[1]);
 await User.create(userData[2]);
}

module.exports = seedUsers;