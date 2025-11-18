import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '../app/hooks';
import { editTaskThunk } from '../features/tasks/tasksThunks';

const EditTaskForm = ({tasks, onClose}) => {
  const[title, setTitle] = useState('');
  const[description, setDescription] = useState('')
 
  const dispatch = useAppDispatch();
  const titleRef = useRef(null);

  useEffect(() => {
    if(tasks) {
      setTitle(tasks.title)
      setDescription(tasks.description)
    }
  }, [tasks]);

  useEffect(() => {
   titleRef.current?.focus();
  }, [])
  
  const handleEditTask = () => {
    if(!title.trim()) return;
    if(!description.trim()) return;

    dispatch(
      editTaskThunk({
        id: tasks._id,
        title,
        description
      })
    )

    onClose();
  }


  return (
    <div className="edit-form-overlay">
      <div className='edit-form'>
        <h3>Edit Task</h3>
        <div className='form-input'>
          <input 
            value={title}
            type="text"
            ref={titleRef}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='edit-buttons-div'>
          <button
            onClick={handleEditTask}  
          >Done</button>
          <button
            onClick={onClose}
          >Cancel</button>
        </div>
      </div>
    </div>
    
  )
}

export default EditTaskForm;