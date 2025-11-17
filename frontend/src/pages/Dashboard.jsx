import axios from 'axios';
import { useState, useEffect } from 'react';
import AddTask from '../components/AddTasks';
import NavBar from '../components/NavBar';
import TaskList from '../components/TaskList';

function Dashboard ({user, onLogout}) {
  const [tasks, setTasks] = useState([]);

  const fetchTaskList = async () => {
    try{
      const response = await axios.get('/api/tasks/task',
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
      );

      console.log(response.data.tasks);
      setTasks(response.data.tasks);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTaskList();
  }, [])

  return (
    <div className='dashboard-container'>
      <NavBar user={user} onLogout={onLogout}/>
      <AddTask onTaskAdded={fetchTaskList}/>
      <h3>Your Tasks</h3>
      <TaskList tasks={tasks}/>
    </div>
  )
}

export default Dashboard;