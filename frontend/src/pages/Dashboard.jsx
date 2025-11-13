import axios from 'axios';
import { useState, useEffect } from 'react';
import AddTask from '../components/AddTasks';
import NavBar from '../components/NavBar';
import TaskList from '../components/TaskList';

function Dashboard ({user}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
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

    fetchTaskList();
  }, [])

  return (
    <div className='dashboard-container'>
      <NavBar user={user}/>
      <AddTask />
      <h3>Tasks for today</h3>
      <TaskList tasks={tasks}/>
    </div>
  )
}

export default Dashboard;