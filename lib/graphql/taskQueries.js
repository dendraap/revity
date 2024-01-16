import { gql } from '@apollo/client';
import { displayFormatDateString } from '../function/displayFormatDate'

// GET ALL TASKS
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
            tasksWithCategory{
            idcategories
            name
            }
            displayDate
        }
    }
`;

// CREATE TASKS
export const INSERT_TASK_MUTATION = gql`
    mutation insert_tasks($email: String!, $title: String!, $set_date: timestamp!, $set_reminder: timestamp, $is_complete: Boolean!, $categories_idcategories: uuid, $displayDate: String!) {
        insert_tasks(objects: {email: $email, title: $title, set_date: $set_date, set_reminder: $set_reminder, is_complete: $is_complete, categories_idcategories: $categories_idcategories, displayDate: $displayDate}) {
            affected_rows
            returning {
                idtask
                title
                email
                set_date
                set_reminder
                is_complete
                last_modified
                description
                categories_idcategories
                tasksWithCategory {
                    idcategories
                    name
                }
                displayDate
            }
        }
    }
`;

// UPDATE TASKS STATUS
export const UPDATE_TASKS_STATUS = gql`
    mutation toggleTaks($idtask: uuid!, $is_complete: Boolean!) {
        update_tasks_by_pk(
            pk_columns: { idtask: $idtask }
            _set: { is_complete: $is_complete }
        ) {
            idtask
            is_complete
        }
    }
`;

// UPDATE TASKS
export const UPDATE_TASKS = gql`
    mutation toggleTaks(
        $idtask: uuid!, 
        $title: String, 
        $categories_idcategories: uuid,
        $set_date: timestamp,
        $set_reminder: timestamp,
        $last_modified: timestamptz
        $displayDate: String!,
    ) {
        update_tasks_by_pk(
            pk_columns: { idtask: $idtask }
            _set: { 
                title: $title,
                categories_idcategories : $categories_idcategories,
                set_date :$set_date,
                set_reminder:$set_reminder
                last_modified: $last_modified
                displayDate: $displayDate
            }
        ) {
            idtask
            title
            is_complete
            categories_idcategories
            email
            set_date
            set_reminder
            last_modified
            tasksWithCategory {
                idcategories
                name
            }
            displayDate
        }
    }
`;

// DELETE TASKS
export const DELETE_TASK = gql`
    mutation deleteTask($idtask: uuid!) {
        delete_tasks(where: { idtask: { _eq: $idtask } }) {
        affected_rows
        }
    }
`;