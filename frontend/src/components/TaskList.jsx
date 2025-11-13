import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
  if(!tasks.length) return <p>No tasks yet.</p>

  return (
    <div className='task-list'>
      {tasks.map((task) => (
        <TaskCard key={task.id} tasks={task} />
      ))}
    </div>
  )
}

export default TaskList;