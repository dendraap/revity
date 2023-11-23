import { gql } from '@apollo/client';

export const GET_DEFAULT_CATEGORIES = gql`
query GetDefaultCategories {
    categories(where: {users_iduser: {_is_null: true}}) {
      name
    }
  }
`;