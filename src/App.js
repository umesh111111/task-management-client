import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import RegistrationForm from './security/registration';
import TaskList from './components/taskList';
import AddTaskForm from './components/addTask';
import taskStore from './fluxComponents/taskStore';
import { addTask, editTask, deleteTask, getTask } from './fluxComponents/taskActions';
import { useState, useEffect } from 'react';
import LoginForm from './security/login';
import PrivateRoute from './security/PrivateRoute';


function App() {
  const [tasks, setTasks] = useState([]);
  const [task, updateTask] = useState({});

  useEffect(() => {
    // Fetch initial tasks data when component mounts
    fetchInitialTasks();
    taskStore.on('change', updateTasks);
    return () => taskStore.removeListener('change', updateTasks);
  }, []);

  function fetchInitialTasks() {
    getTask();
  }

  function updateTasks() {
    setTasks([...taskStore.getTasks()]); // Spread operator to create a new array
  }

  function handleAddTask(task) {
    //task['id'] = tasks.length + 1;
    addTask(task);
  }

  function onEditTask(task) {
    editTask(task.id, task);
  }

  function handleEditTask(updatedTask) {
    updateTask({ ...updatedTask });
  }

  function handleDeleteTask(task) {
    deleteTask(task)
  }

  return (
    <Router>
      <ToastContainer />
      <div>
        <Routes>
          <Route path="/register" element={ // Use `element` instead of wrapping in a `div`
            <RegistrationForm />
          } />
          <Route path="" element={ // Use `element` instead of wrapping in a `div`
            <LoginForm />
          } />
          <Route path="/login" element={ // Use `element` instead of wrapping in a `div`
            <LoginForm />
          } />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AddTaskForm updateTask={task} onAddTask={handleAddTask} onEditTask={onEditTask} />
                <TaskList tasks={tasks} handleEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
