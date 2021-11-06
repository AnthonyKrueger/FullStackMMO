import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
    query allUsers {
        allUsers {
            id
            username
            email
        }
    }
`;

export const GET_ME = gql`
    query getMe {
        me {
            id
            username
            email
        }
    }
`

export const GET_USER = gql`
    query getUser($id: ID!) {
        user(id: $id) {
            id
            username
            email
        }
    }
`