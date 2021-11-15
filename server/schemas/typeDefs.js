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
        levelPoints: Int
        nextLevel: Int
        useritems: [UserItem]
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
        item: Item
        quantity: Int
    }

    type Step {
        experience: Int
        gold: Int
        message: String
        level: Int
        levelPoints: Int
        nextLevel: Int
        item: String
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
        takeStep(token: ID!): Step
        sellItem(token: ID!, userItemId: ID!, quantity: Int!): User
    }
`

module.exports = typeDefs;