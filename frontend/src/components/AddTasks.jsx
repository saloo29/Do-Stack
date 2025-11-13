import axios from 'axios';
import { useState } from 'react';


function AddTask () {
  const [title, setTitle] = useState('');
  const [ description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleCancel = () =>{
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  }

  const handleAddTask = async () => {
    await axios.post('/api/tasks/task', {
      title,
      description
    },{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(function (response) {
      console.log(response.data)

      setIsExpanded(false);
      resetForm();
    })
    .catch(function (error) {
      console.log(error)
    });
  };


  return (
    <div className='addtask-container'>
      {!isExpanded && 
        (<button 
          onClick={() => setIsExpanded(true)}
          className='app-button'
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
          <input 
            className='form-input'
            type= "text"
            value={title}
            placeholder='Add title'
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            required
          />
          <input 
            className='form-input'
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
            className='app-button'
          >Add Task</button>

          <button 
            className='app-button'
            onClick={handleCancel}
          >Cancel</button>
        </div>
      </form>
      )}
      
    </div>
  )
}

export default AddTask;