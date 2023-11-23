import { gql } from '@apollo/client';

export const GET_USERS  = gql`
query MyQuery {
    users {
      name
      iduser
    }
  }
`;