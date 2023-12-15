import { gql } from '@apollo/client';

export const TASKS = gql`
query MyQuery($email: String!) @cached {
  tasks(
    where: { email: { _eq: $email } }
    order_by: [{ is_complete: asc }, { set_date: asc }]
  ) {
    idtask
    title
    is_complete
    categories_idcategories
    email
    last_modified
    set_date
    set_reminder
    description
  }
}
`;