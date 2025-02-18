import { TextField, Card, CardContent, CardActions, Button, Typography, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todos, todoListId, onChange, onDelete, onAddTodo, onCheck }) => {



  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoListId}</Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.todoTitle}
                onChange={(event) => {
                  onChange(event.target.value, todo, index);
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  onDelete(todo.todoId);
                }}
              >
                <DeleteIcon />
              </Button>
              <Checkbox
                on
                checked={todo.complete}
                onClick={(event) => { onCheck(!todo.complete, todo, index) }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={async () => {
                onAddTodo()
              }}
            >
              Add Todo <AddIcon />
            </Button>

          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
