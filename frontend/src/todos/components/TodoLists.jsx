import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import { fetchTodos, deleteTodo, addTodo, putTodoTitle, putTodoComplete } from '../../API/API'
import { v4 as uuidv4 } from 'uuid';
import useDebouncer from '../../hooks/useDebouncer'




export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()
  const [todos, setTodos] = useState([])
  const [updatedTodo, setUpdateTodo] = useState(null);
  const debouncedTodo = useDebouncer(updatedTodo, 300)
  const getTodoLists = async () => {
    const todoList = await fetchTodos("Gustav");
    setTodoLists(todoList);
  }
  useEffect(() => {
    getTodoLists();
  }, [])

  useEffect(() => {
    if (debouncedTodo) {

      putTodoTitle(debouncedTodo.todoId, debouncedTodo.todoTitle)
    }
  }, [debouncedTodo])



  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <div style={{ display: "flex" }}>

                <ListItemButton key={key} onClick={() => {
                  setActiveList(key)
                  setTodos(todoLists[key])
                }
                }>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>

                  <ListItemText primary={key} />
                </ListItemButton>
                <CircularProgress variant="determinate" value={(todoLists[key].filter(todo => todo.complete).length / todoLists[key].length) * 100} />

              </div>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          onChange={async (value, todo, index) => {
            const newTodo = { ...todo, todoTitle: value };

            setTodos((prevTodos) =>
              prevTodos.map((todo, todoIndex) => (todoIndex === index ? newTodo : todo))
            );

            setTodoLists((prevTodoLists) => ({
              ...prevTodoLists,
              [activeList]: prevTodoLists[activeList].map((todo, todoIndex) =>
                todoIndex === index ? newTodo : todo
              ),
            }));
            setUpdateTodo(newTodo);
          }}
          onDelete={(todoId, index) => {
            const updatedTodos = todos.filter((todo) => todo.todoId !== todoId)
            const updatedTodoLists = { ...todoLists };
            updatedTodoLists[activeList] = updatedTodos;
            setTodoLists(updatedTodoLists);
            setTodos(updatedTodos);
            deleteTodo(todoId);
          }}
          onAddTodo={async () => {
            const newTodo = { "todoListId": activeList, "todoId": uuidv4() };
            const updatedTodos = [...todos, newTodo]
            const updatedTodoLists = { ...todoLists };
            updatedTodoLists[activeList] = updatedTodos;
            setTodoLists(updatedTodoLists)
            setTodos(updatedTodos)
            await addTodo("Gustav", newTodo.todoListId, '', newTodo.todoId);
          }}
          onCheck={(value, todo, index) => {
            console.log(value)
            const newTodo = { ...todo, complete: value };
            setTodos((prevTodos) =>
              prevTodos.map((todo, todoIndex) => (todoIndex === index ? newTodo : todo))
            );

            setTodoLists((prevTodoLists) => ({
              ...prevTodoLists,
              [activeList]: prevTodoLists[activeList].map((todo, todoIndex) =>
                todoIndex === index ? newTodo : todo
              ),
            }));
            putTodoComplete(todo.todoId, value);

          }}
          todos={todos}
          todoListId={activeList}
        />
      )}
    </Fragment>
  )
}
