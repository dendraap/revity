import { gql } from '@apollo/client';

export const INSERT_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    insert_users(objects: { name: $name, email: $email, password: $password }) {
      affected_rows
      returning {
        iduser
        name
        email
      }
    }
  }
`;
