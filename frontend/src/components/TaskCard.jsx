import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { deleteTaskThunk } from '../features/tasks/tasksThunks'
import EditTaskForm from './EditTaskForm';

const TaskCard = ({ tasks }) => {
  const[showEditForm, setShowEditForm] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTaskThunk ({
      id: tasks._id
    }));
  }
  return (
    <>
      {showEditForm && (
        <EditTaskForm 
          onClose={() => setShowEditForm(false)} 
          tasks={tasks}
        />
      )}
      
      <div className="task-card">
        <div className="task-header">
          <h3 className="task-title">{tasks.title}</h3>
          <div className="task-actions">
            <button 
              className="edit-btn"
              onClick={() => setShowEditForm(true)}
            >Edit</button>
            <button 
              className="delete-btn"
              onClick={handleDeleteTask}
            >Delete</button>
          </div>
        </div>
        <div className="task-body">
          <p className="task-description">{tasks.description}</p>
        </div>
      </div>
    </>
  )
}

export default TaskCard;