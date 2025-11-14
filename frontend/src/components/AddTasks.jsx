import axios from 'axios';
import { useState, useRef, useEffect } from 'react';


function AddTask ({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [ description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const titleRef =  useRef();

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

  const handleAddTask = async () => {
    if(!title.trim()) return;
    if(!description.trim()) return;

    try {
      setIsLoading(true);

      const response = await axios.post(
        '/api/tasks/task', 
        { title,description},
        {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("token")}`
          }
        });
    
      console.log(response.data)

      if(onTaskAdded) onTaskAdded();

      setIsExpanded(false);
      resetForm();
    } catch(error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
            >{isLoading ? 'Adding...' : 'Add Task'}</button>

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