import { useMutation, useQuery } from "@apollo/client";
import { CATEGORIES, INSERT_CATEGORY_ONE_MUTATION, DELETE_CATEGORY } from './categoryQueries'

// GET CATEGORIES
export const useCategories = (email: any) => {
    const { data, loading, error } = useQuery(CATEGORIES, {
        variables: { email: email }
    });
    return { categories: data?.categories ?? [], loading, error: Boolean(error) }
}

// CREATE CATEGORIES
export const useAddCategory = () => {
    const [addCategoryMutation, { loading: addingCategory }] = useMutation(INSERT_CATEGORY_ONE_MUTATION)

    const addCategory = async ({ tempCategory }: any) => {
        const { data: { category } } = await addCategoryMutation({
            variables: {
                email: tempCategory.email,
                name: tempCategory.name,
            },
            update: (cache, { data }) => {
                const newCategory = data.insert_categories_one
                cache.updateQuery({
                    query: CATEGORIES,
                    variables: {
                        email: tempCategory.email
                    }
                }, (oldCategory) => {
                    return {
                        categories: [...oldCategory.categories, newCategory]
                    }
                })
            }
        })
        return category
    }
    return { addCategory, addingCategory }
}

// DELETE CATEGORIES
export const useDeleteCategory = () => {
    const [deleteCategoryMutation, { loading: deletingCategory }] = useMutation(DELETE_CATEGORY)

    const deleteCategory = async (idcategories: any) => {
        try {
            await deleteCategoryMutation({
                variables: { idcategories },
                update: (cache) => {
                    cache.modify({
                        fields: {
                            tasks(existingTask = [], {readField}) {
                                return existingTask.filter(
                                    (prev: any) =>  idcategories !== readField('categories_idcategories', prev)
                                )
                            },
                            categories(existingCategory = [], { readField }) {
                                return existingCategory.filter(
                                    (prev: any) => idcategories !== readField('idcategories', prev)
                                )
                            }
                        }
                    })
                }
            })
        } catch (err) {
            console.error('Error deleting category: ', err)
        }
    }
    return { deleteCategory, deletingCategory }
}
