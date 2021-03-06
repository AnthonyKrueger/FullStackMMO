import { gql } from '@apollo/client'

export const LOGIN_USER = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                id
                username
            }
            token
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser($email: String!, $username: String!, $password: String!) {
     addUser(email: $email, username: $username, password: $password) {
         user {
              id
              username
             }
         token
  }
}
`

export const TAKE_STEP = gql`
    mutation takeStep($token: ID!) {
        takeStep(token: $token) {
            user {
                experience
                gold
                level
                levelPoints
                nextLevel
                maxhealth
                health
                steps
                useritems {
                    id
                    quantity
                    item {
                    name
                    type
                    level
                    value
                    stat
                }
                }
            }
            item
            message
        }
    }
`

export const SELL_ITEM = gql `
    mutation sellItem($token: ID!, $userItemId: ID!, $quantity: Int!) {
        sellItem(token: $token, userItemId: $userItemId, quantity: $quantity) {
            gold
            useritems {
                id
                quantity
                item {
                    name
                    type
                    level
                    value
                    stat
                }
            }
        }
    }
`

export const LEVEL_SKILL = gql `
    mutation levelSkill($token: ID!, $skill: String) {
        levelSkill(token: $token, skill: $skill) {
            strength
            endurance
            speed
            levelPoints
        }
    }
`