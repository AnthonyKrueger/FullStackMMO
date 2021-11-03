const { AuthenticationError } = require('apollo-server-express');
const { User, Item} = require("../models")
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        allUsers: async () => {
            const users = await User.findAll({})
            return users;
        },

        allItems: async () => {
            const items = await Item.findAll({})
            return items;
        }
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
    }
};

module.exports = resolvers;