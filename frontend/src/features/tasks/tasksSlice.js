import { createSlice } from '@reduxjs/toolkit'
import { fetchTasksThunk, addTaskThunk, editTaskThunk, deleteTaskThunk } from './tasksThunks'

const initialState = {
  tasks: [],
  loading: false,
  error: null
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks: () => initialState,
    loadingTasks: (state) => {
      state.loading = true;
    },
    clearError (state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder 

    .addCase(fetchTasksThunk.pending, (state) => {
      state.loading = true;
      state.error =  null;
    })
    .addCase(fetchTasksThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    })
    .addCase(fetchTasksThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to load tasks'
    })
    .addCase(addTaskThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addTaskThunk.fulfilled, (state, action) =>{
      state.loading = false;
      state.tasks.push(action.payload)
    })
    .addCase(addTaskThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to add task';
    })
    .addCase(editTaskThunk.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    .addCase(editTaskThunk.fulfilled, (state, action) => {
      state.loading = false;
      
      const updatedTask = action.payload;
      const index = state.tasks.findIndex(t => t._id === updatedTask._id);

      if(index !== -1){
        state.tasks[index] = updatedTask;
      }
    })
    .addCase(editTaskThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to edit task'
    })
    .addCase(deleteTaskThunk.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    .addCase(deleteTaskThunk.fulfilled, (state, action) => {
      state.loading = false 
      const deletedTask = action.payload;

      state.tasks = state.tasks.filter(t => t._id !== deletedTask._id)    
    })
    .addCase(deleteTaskThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to delect task";
    })
  }
})

export const {resetTasks, loadingTasks, clearError} = tasksSlice.actions;
export default tasksSlice.reducer;