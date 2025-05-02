import { useState } from 'react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

Amplify.configure(outputs);

interface TodoItem {
  id: string;
  content: string;
}

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    const newTodoItem: TodoItem = {
      id: crypto.randomUUID(),
      content: newTodo.trim(),
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    console.log('Todo added (frontend only):', newTodoItem);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main style={{ padding: '2rem' }}>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>

          <Box sx={{ display: 'flex', gap: 1, marginBottom: '1rem' }}>
            <TextField
              label="New Todo"
              variant="outlined"
              value={newTodo}
              onChange={handleInputChange}
              size="small"
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleAddTodo}
              disabled={!newTodo.trim()}
            >
              Add
            </Button>
          </Box>

          <Box sx={{ border: '1px solid lightgray', borderRadius: '4px', minHeight: '200px', marginBottom: '1rem' }}>
            <List>
              {todos.map((todo) => (
                <ListItem key={todo.id}>
                  <ListItemText primary={todo.content} />
                </ListItem>
              ))}
              {todos.length === 0 && (
                <ListItem>
                  <ListItemText primary="No todos yet!" />
                </ListItem>
              )}
            </List>
          </Box>

          <Button variant="contained" color="secondary" onClick={signOut}>
            Sign Out
          </Button>

        </main>
      )}
    </Authenticator>
  );
}

export default App;