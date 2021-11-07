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