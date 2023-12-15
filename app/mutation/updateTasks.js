import { gql } from '@apollo/client';

export const UPDATE_TASKS = gql`
    mutation toggleTaks(
        $idtask: uuid!, 
        $title: String, 
        $categories_idcategories: uuid,
        $set_date: timestamp,
        $set_reminder: timestamp,
    ) {
        update_tasks_by_pk(
            pk_columns: { idtask: $idtask }
            _set: { 
                title: $title,
                categories_idcategories : $categories_idcategories,
                set_date :$set_date,
                set_reminder:$set_reminder
            }
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

