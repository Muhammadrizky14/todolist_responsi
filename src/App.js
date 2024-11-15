import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const lightTheme = {
      backgroundColor: '#ffffff',
      color: '#161414',
      buttonBackground: '#007bff',
      buttonColor: '#ffffff'
    };

    const darkTheme = {
      backgroundColor: '#161414',
      color: '#e0e0e0',
      buttonBackground: '#555555',
      buttonColor: '#ffffff'
    };

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };

    const theme = darkMode ? darkTheme : lightTheme;

    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => {
      setShowForm(false);
      setTaskToEdit(null);
    };

    const addTask = (task) => {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    };

    const editTask = (updatedTask) => {
      setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const deleteTask = (id) => {
      setTasks(tasks.filter(task => task.id !== id));
    };

    const showEditForm = (task) => {
      setTaskToEdit(task);
      handleShowForm();
    };

    return (
        <Container
          fluid
          className="App-container"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            transition: 'all 0.3s ease'
          }}
        >
            <h1 className="mb-4">Task List</h1>
            <div className="d-flex align-items-center mb-4">
                <Button
                  style={{
                    backgroundColor: theme.buttonBackground,
                    color: theme.buttonColor,
                    borderColor: theme.buttonBackground
                  }}
                  onClick={handleShowForm}
                >
                  + Add Task
                </Button>
                <Button
                  style={{
                    backgroundColor: theme.buttonBackground,
                    color: theme.buttonColor,
                    borderColor: theme.buttonBackground,
                    marginLeft: '10px'
                  }}
                  onClick={toggleDarkMode}
                >
                  {darkMode ? ' Light Mode' : ' Dark Mode'}
                </Button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <TaskList tasks={tasks} deleteTask={deleteTask} showEditForm={showEditForm} />
              <TaskForm
                show={showForm}
                handleClose={handleCloseForm}
                addTask={addTask}
                editTask={editTask}
                taskToEdit={taskToEdit}
              />
            </div>
        </Container>
    );
}

export default App;
