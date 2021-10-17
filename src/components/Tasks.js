import Task from "./Task"
import PropTypes from 'prop-types'

const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <>
            {tasks.map((task) => (
            <Task onToggle={onToggle} onDelete={onDelete} key={task.id} task={task} />
            ))}
        </>
    )
}

Tasks.prototype = {
    onDelete: PropTypes.func
}

export default Tasks
