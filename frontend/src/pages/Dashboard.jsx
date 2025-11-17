import { useEffect } from 'react';
import { fetchTasksThunk } from '../features/tasks/tasksThunks';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import AddTask from '../components/AddTasks';
import NavBar from '../components/NavBar';
import TaskList from '../components/TaskList';

function Dashboard ({user, onLogout}) {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const loading = useAppSelector((state) => state.tasks.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, [dispatch])

  console.log("Redux tasks:", tasks);
  console.log("loading:", loading);

  return (
    <div className='dashboard-container'>
      <NavBar user={user} onLogout={onLogout}/>
      <AddTask/>
      <h3>Your Tasks</h3>
      {loading ? <p>Loading...</p> : <TaskList tasks={tasks}/>}
    </div>
  )
}

export default Dashboard;