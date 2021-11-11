const { gql } = require("apollo-server-express")

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String
        level: Int
        strength: Int
        endurance: Int
        speed: Int
        experience: Int
        gold: Int
        health: Int
        maxhealth: Int
        steps: Int
        nextStepTime: String
    }

    type Item {
        id: Int
        name: String
        type: String
        level: Int
        value: Int
        stat: String
    }

    type UserItem {
        id: ID!
        userId: String
        itemId: String
    }

    type Auth {
         token: ID!
         user: User
    }

    type Query {
        allUsers: [User]
        allItems: [Item]
        user(id: ID!): User
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        takeStep(token: ID!): User
    }
`

module.exports = typeDefs;