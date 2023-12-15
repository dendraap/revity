import { gql } from '@apollo/client';

export const INSERT_CATEGORY_ONE_MUTATION = gql`
mutation insert_categories_one($object: categories_insert_input!) {
    insert_categories_one(object: $object) {
      created_at
      email
      idcategories
      last_modified
      name
    }
  }
`;