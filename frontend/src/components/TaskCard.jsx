const TaskCard = ({ tasks }) => {
  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{tasks.title}</h3>
        <div className="task-actions">
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
      <div className="task-body">
        <p className="task-description">{tasks.description}</p>
      </div>
    </div>
  )
}

export default TaskCard;