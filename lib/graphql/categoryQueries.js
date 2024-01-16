import { gql } from '@apollo/client';

// GET CATEGORY
export const CATEGORIES = gql`
    query MyQuery($email: String!) @cached {
        categories(
            where: { _or: [{ email: { _is_null: true } }, { email: { _eq: $email } }] }
            order_by: {created_at: asc}
        ) {
            idcategories
            name
        }
    }
`;


// CREATE CATEGORY
export const INSERT_CATEGORY_ONE_MUTATION = gql`
    mutation insert_categories_one($email: String!, $name: String!) {
        insert_categories_one(object: {email: $email, name: $name}) {
            idcategories
            email
            name
        }
    }

`;

// DELETE CATEGORY
export const DELETE_CATEGORY = gql`
    mutation deleteCategory($idcategories: uuid!) {
        delete_tasks(where: {categories_idcategories: {_eq: $idcategories}}) {
            affected_rows
        }
        delete_categories(where: { idcategories: {_eq: $idcategories}}) {
            affected_rows
        }
    }
`