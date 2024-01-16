import { useMutation, useQuery } from "@apollo/client";
import { TASKS, INSERT_TASK_MUTATION, UPDATE_TASKS_STATUS, UPDATE_TASKS, DELETE_TASK } from "./taskQueries"

// GET TASKS
export const useTask = (email: any) => {
  const { data, loading, error } = useQuery(TASKS, {
    variables: { email: email }
  });
  return { tasks: data?.tasks ?? [], loading, error: Boolean(error) }
}

// GET TASKS BY CATEGORY

// CREATE TASKS
export const useAddTask = () => {
  const [addTaskMutation, { loading: addingTask }] = useMutation(INSERT_TASK_MUTATION)

  const addTask = async ({ tempTask }: any) => {
    const { data: { task } } = await addTaskMutation({
      variables: {
        title: tempTask.title,
        is_complete: tempTask.is_complete,
        categories_idcategories: tempTask.categories_idcategories,
        email: tempTask.email,
        set_date: tempTask.set_date,
        set_reminder: tempTask.set_reminder,
        last_modified: new Date().toISOString(),
        description: null,
        displayDate: tempTask.displayDate,
      },
      update: (cache, { data }) => {
        const newTask = data.insert_tasks.returning[0]
        cache.updateQuery({
          query: TASKS,
          variables: {
            email: tempTask.email
          }
        }, (oldTask) => {
          return {
            tasks: [...oldTask.tasks, newTask]
          }
        })
      }
    })
    return task
  }
  return { addTask, addingTask }
}

// UPDATE TASKS STATUS
export const useUpdateTaskStatus = () => {
  const [updateStatusMutation] = useMutation(UPDATE_TASKS_STATUS)

  const updateStatusTask = async (idtask: any, email: any, is_complete: Boolean) => {
    const { data: { task } } = await updateStatusMutation({
      variables: {
        idtask: idtask,
        is_complete: !is_complete
      },
      update: (cache, { data }) => {
        const newTask = data.update_tasks_by_pk
        cache.updateQuery({
          query: TASKS,
          variables: {
            email: email
          }
        }, (oldTask) => {
          const updatedTasks = oldTask.tasks.map((task: any) => {
            if (task.idtask === newTask.idtask) {
              return { ...task, is_complete: newTask.is_complete }
            }
            return task
          })
          return {
            tasks: updatedTasks
          };
        })
      }
    })
    return task
  }
  return { updateStatusTask }
}

// UPDATE TASKS
export const useUpdateTask = () => {
  const [updateTaskMutation, { loading: updatingTask }] = useMutation(UPDATE_TASKS)

  const updateTask = async ({ tempTask }: any) => {
    const { data: { task } } = await updateTaskMutation({
      variables: {
        idtask: tempTask.idtask,
        title: tempTask.title,
        categories_idcategories: tempTask.categories_idcategories,
        set_date: tempTask.set_date,
        set_reminder: tempTask.set_reminder,
        last_modified: new Date().toISOString(),
        displayDate: tempTask.displayDate,
      },
      update: (cache, { data }) => {
        const updatedTask = data.update_tasks_by_pk;
        cache.modify({
          fields: {
            tasks(existingTasks = [], { readField }) {
              return existingTasks.map((prev: any) => {
                if (readField('idtask', prev) === updatedTask.idtask) {
                  return {
                    ...prev,
                    categories_idcategories: updatedTask.categories_idcategories,
                    displayDate: updatedTask.displayDate,
                    last_modified: updatedTask.last_modified,
                    set_date: updatedTask.set_date,
                    set_reminder: updatedTask.set_reminder,
                    title: updatedTask.title,
                    tasksWithCategory: {
                      ...prev.tasksWithCategory,
                      idcategories: updatedTask.tasksWithCategory.idcategories,
                      name: updatedTask.tasksWithCategory.name
                    }
                  };
                }
                return prev;
              });
            },
          },
        });
      }
    })
    return task
  }
  return { updateTask, updatingTask }
}

// DELETE TASKS
export const useDeleteTask = () => {
  const [deleteMutation, { loading: deletingTask }] = useMutation(DELETE_TASK);

  const deleteTask = async (idtask: any, email: any) => {
    try {
      await deleteMutation({
        variables: { idtask },
        update: (cache) => {
          cache.modify({
            fields: {
              tasks(existingTasks = [], { readField }) {
                return existingTasks.filter(
                  (taskRef: any) => idtask !== readField('idtask', taskRef)
                );
              },
            },
          });
        },
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  return { deleteTask, deletingTask };
};

// GET CATEGORY
export const useCategory = (email: any) => {
  const { data, loading, error } = useQuery(TASKS, {
    variables: { email: email }
  });
  return { tasks: data?.tasks ?? [], loading, error: Boolean(error) }
}