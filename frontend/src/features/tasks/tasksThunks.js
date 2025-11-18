import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchTasksThunk = createAsyncThunk(
  'tasks/fetchTasks',
  async(_, thunkAPI) => {
    try{
      const res = await axios.get('/api/tasks/task', {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      });
      return res.data.tasks;
    } catch(error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const addTaskThunk = createAsyncThunk(
  'tasks/addTask',
  async(data, thunkAPI) => {
    try {
      const response = await axios.post(
        '/api/tasks/task', 
        {
          title: data.title, 
          description: data.description
        },{
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      })

      return response.data.task;
    } catch(error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to add task");
    }
  }
);

export const editTaskThunk = createAsyncThunk(
  'tasks/editTask',
  async({id, title, description}, thunkAPI) => {
    try{
      const response = await axios.put(
      `api/tasks/task/${id}`,
      {
        title,
        description
      },{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
   
      console.log(response.data)
      return response.data
  } catch(error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to edit the task')
  }
  }
)
