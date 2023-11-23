import { gql } from '@apollo/client';

export const GET_ALL_USER  = gql`
query GetAllUser {
    users {
      name
    }
  }
`;