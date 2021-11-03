# FSMMO Planning Sheet


## Mechanics and Idea
----
    FullStackMMO is planned to be an extremely simplified version of a Massively Multiplayer Online Roleplaying Game built fully with Node.js and React. Users should be able to create an account with an associated character. They should be able to complete tasks and to collect currency, experience, and items. A basic economy and trading system will be implemented to allow user interaction.

### Base Mechanics

    - Character
        - Strength, Endurance, and Speed stats
        - Name
        - Avatar
        - Class ???
    - Working Inventory for Items
    - "Take Steps" to gain gold / experience or items
    - Battle random enemies with stats

## Tech Stack Decisions
----

### Frontend

    - ReactJS
    - Apollo-Client
    - MaterialUI
    - SASS

### Backend

    - NodeJS
    - Express
    - GraphQL
    - JSONWebToken Authentication
    - MySQL Database
    - Sequelize ORM
    - AWS S3

## Gameplan
----
    1. Data Modeling
        a. User Model
        b. Item Model
        c. Relational Inventory
        d. Implement with Mongoose
        e. GraphQL Basic Queries and Mutations

    2. Auth and Login
        a. Create auth utils for backend
        b. Create User and Login Mutations
        
    3. Frontend Structuring
        a. Wireframe
            - Login/Signup
            - Splash
            - Dashboard
        b. Install dependencies in React
            - MUI
            - Apollo
        c. Build Login/Sign-Up