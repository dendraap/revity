import { gql } from '@apollo/client';

export const INSERT_TASK_ONE_MUTATION = gql`
  mutation insert_tasks_one($object: tasks_insert_input!) {
    insert_tasks_one(object: $object) {
      categories_idcategories
      email
      idtask
      is_complete
      set_date
      set_reminder
      title
    }
  }
`;