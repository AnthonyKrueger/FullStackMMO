const { AuthenticationError } = require('apollo-server-express');
const { User, Item} = require("../models")
const { signToken, verifyUser } = require('../utils/auth');

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
                }
              })
              const addedExperience = 10;
              const addedGold = 10;
              user.gold += addedGold;
              user.experience += addedExperience;
              user.steps += 1;
              user.save()
              console.log(user.dataValues)
              return({gold: addedGold, experience: addedExperience, message: "You Took A Step"})
            }
            else {
              return "nope"
            }
          }
    }
};

module.exports = resolvers;