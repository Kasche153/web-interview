import express from 'express'
import cors from 'cors'
import { addTodo, updateComplete, deleteItem, getTodos, updateTitle } from './db.js'


const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const todos = await getTodos(userId);
    res.send(todos)
})


app.post("/todo", async (req, res) => {
    const { userId, todoTitle, todoListId, todoId } = req.body;
    const data = await addTodo(userId, todoListId, todoTitle, todoId);
    res.send(data)

})

app.put("/todoCompleteUpdate", async (req, res) => {
    const { todoId, complete } = req.body;

    const data = await updateComplete(todoId, complete);
    res.status(200).send(data)

})

app.put("/todoTitleUpdate", async (req, res) => {
    const { todoId, todoTitle } = req.body;

    const data = updateTitle(todoId, todoTitle);
    res.send(data)

})

app.delete("/todo", async (req, res) => {
    const { todoId } = req.body;
    const data = deleteItem(todoId);
    res.send(data)

})


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
