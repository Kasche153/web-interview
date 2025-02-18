


const API_URL = "http://localhost:3001/"
export const fetchTodos = async (userId) => {
    const data = await fetch(API_URL + userId);
    const json = await data.json();
    return json;
}

export const addTodo = async (userId, todoListId, todoTitle, todoId) => {

    const body = JSON.stringify({ userId: userId, todoListId: todoListId, todoTitle, todoId: todoId })
    await fetch(API_URL + "todo", {
        method: "POST", body: body,
        headers: { 'Content-Type': 'application/json' }
    });

}


export const deleteTodo = async (todoId) => {
    const body = JSON.stringify({ todoId: todoId })
    await fetch(API_URL + "todo", {
        method: "POST", body: body,
        headers: { 'Content-Type': 'application/json' }
    });

}

export const putTodoTitle = async (todoId, todoTitle) => {
    const body = JSON.stringify({ todoId: todoId, todoTitle })
    await fetch(API_URL + "todoTitleUpdate", {
        method: "PUT", body: body,
        headers: { 'Content-Type': 'application/json' }
    });
}

export const putTodoComplete = async (todoId, complete) => {
    const body = JSON.stringify({ todoId: todoId, complete })
    await fetch(API_URL + "todoCompleteUpdate", {
        method: "PUT", body: body,
        headers: { 'Content-Type': 'application/json' }
    });
} 