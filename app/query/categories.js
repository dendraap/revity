import { gql } from '@apollo/client';

export const CATEGORIES = gql`
query MyQuery($email: String!) @cached {
    categories(
      where: { _or: [{ email: { _is_null: true } }, { email: { _eq: $email } }] }
      order_by: {created_at: asc}
    ) {
      idcategories
      name
      email
    }
  }
  
`;