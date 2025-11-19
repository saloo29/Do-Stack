import { useState, useRef, useEffect } from 'react';
import { addTaskThunk } from '../features/tasks/tasksThunks';
import { useAppDispatch, useAppSelector } from '../app/hooks';


function AddTask () {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const loading = useAppSelector((state) => state.tasks.loading);

  const titleRef =  useRef();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(isExpanded) titleRef.current.focus();
  }, [isExpanded])

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleCancel = (e) =>{
    e.preventDefault();
    resetForm();
    setIsExpanded(false);
  }

  const handleAddTask = () => {
    if(!title.trim()) return;
    if(!description.trim()) return;

    dispatch(addTaskThunk({title, description}))
    setIsExpanded(false);
    resetForm();

  };


  return (
    <div className='addtask-container'>
      {!isExpanded && 
        (<button 
          onClick={() => setIsExpanded(true)}
          className='add-btn'
          >+ Add Task
        </button>)}
      {isExpanded && (
        <form 
          onSubmit={(e) => {
            e.preventDefault(); 
            handleAddTask(); 
          }}
        >
        <div className='form-wrapper'>
          <div className='form-title'>
            <label htmlFor='title'>Add a New Task</label>
            <p>Keep track of what you need to do</p>
          </div>

          <div>
            <input 
              className='add-form-input'
              type= "text"
              value={title}
              placeholder='Add title'
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              ref={titleRef}
              required
            />
            <input 
              className='add-form-input'
              type='text'
              value={description}
              placeholder='Add description'
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              required
            />
          </div>
          <div className='form-button'>
            <button 
              type='submit'
              className='add-btn'
              disabled={loading}
            >{loading ? 'Adding...' : 'Add Task'}</button>

            <button 
              className='edit-btn'
              onClick={
                handleCancel}
            >Cancel</button>
          </div>
        </div>
      </form>
      )}
      
    </div>
  )
}

export default AddTask;