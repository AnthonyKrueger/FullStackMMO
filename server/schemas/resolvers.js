const { AuthenticationError } = require('apollo-server-express');
const { User, Item, UserItem} = require("../models")
const { signToken, verifyUser } = require('../utils/auth');
const {nextLevel, addExp, addGold, chooseStepEvent} = require("../utils/gameFunctions")

const resolvers = {
    Query: {
        allUsers: async () => {
            const users = await User.findAll({})
            return users;
        },

        allItems: async () => {
            const items = await Item.findAll({})
            return items;
        },
        user: async (parent, {id}, context) => {
            const user = await User.findOne({
              where: {
                id: id
              }
            })
            console.log(context)
            return user;
        },
        me: async (parent, args, context) => {
          console.log(context)
            if (context.user) {
              return await User.findOne({ id: context.user.id });
        }
          },
    },

    Mutation: {
        
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ 
                username: username, 
                email: email, 
                password: password });
            const token = signToken(user);
            return { token, user };
          },

          login: async (parent, { email, password }) => {
            const user = await User.findOne({
                where: {
                    email: email,
                },
            });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.validPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
          takeStep: async (parent, {token}) => {
            const data = await verifyUser(token)
            if(data) {
              const user = await User.findOne({
                where: {
                  id: data.id
                },
                include: [{model: UserItem, include: Item}]
              })
              let message = "";
              let itemLoot = null;
              if(Date.now() >= user.nextStepTime) {
                message = "You Took A Step!"
                const event = chooseStepEvent();
                if(event.gold) {
                  user.gold += addGold(user.level);
                }
                if(event.exp) {
                  user.experience += addExp(user.level);
                }
                if(event.item) {
                  const newItem = await UserItem.create({
                    itemId: 1,
                    userId: user.id
                  })
                  const givenItem = await UserItem.findOne({
                    where: {
                      id: newItem.id
                    },
                    include: [Item]
                  })
                  itemLoot = `${givenItem.item.name} Level ${givenItem.item.level}`
                }
                if(user.experience >= user.nextLevel) {
                  user.experience -= user.nextLevel
                  user.levelPoints += 1;
                  user.level += 1;
                  user.nextLevel = nextLevel(user.level)
                }

                user.steps += 1;
                user.nextStepTime = Date.now() + 3000
                user.save()
              }
              else {
                message = "You Must Wait to Take A Step!"
              }
              return ({gold: user.gold, nextLevel: user.nextLevel, experience: user.experience, level: user.level, levelPoints: user.levelPoints, message: message, item: itemLoot})
            }
          }
    }
};

module.exports = resolvers;