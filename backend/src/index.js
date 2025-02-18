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
    console.log(req.body)
    const { userId, todoTitle, todoListId, todoId } = req.body;
    addTodo(userId, todoListId, todoTitle, todoId);
    res.send(":)")

})

app.put("/todoCompleteUpdate", async (req, res) => {
    const { todoId, complete } = req.body;

    updateComplete(todoId, complete);
    res.status(200).send("")

})

app.put("/todoTitleUpdate", async (req, res) => {
    const { todoId, todoTitle } = req.body;
    console
    updateTitle(todoId, todoTitle);
    res.status(200).send("")

})

app.delete("/todo", async (req, res) => {
    const { todoId } = req.body;
    deleteItem(todoId);
    res.status(200).send("")

})


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
