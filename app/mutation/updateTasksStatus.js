import { gql } from '@apollo/client';

export const UPDATE_TASKS_STATUS = gql`
  mutation toggleTaks($idtask: uuid!, $is_complete: Boolean!) {
    update_tasks_by_pk(
      pk_columns: { idtask: $idtask }
      _set: { is_complete: $is_complete }
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

