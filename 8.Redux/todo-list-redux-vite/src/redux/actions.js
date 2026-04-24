export const addTodoAction = (data) => {
    return { type: "todos/todoAdded", payload: data };
};

export const deleteTodoAction = (id) => {
    return { type: "todos/todoDeleted", payload: id };
};