import { gql } from '@apollo/client';

export const DELETE_TASK = gql`
mutation deleteTask($idtask: uuid!) {
    delete_tasks(where: { idtask: { _eq: $idtask } }) {
      affected_rows
    }
  }
`;
