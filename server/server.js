const path = require("path")
const express = require('express')
const { ApolloServer } = require('apollo-server-express');

const seedAll = require("./seeds")

const sequelize = require('./config/connection');

const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

async function startServer() {
    await server.start()
    server.applyMiddleware({ app });
}

startServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, async () => {
        // await seedAll();
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});