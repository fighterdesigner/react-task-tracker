import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "DELETE"
  })
  setTasks(tasks.filter((task) => task.id !== id))
}

const toggleReminder = async (id) => {

  const taskToToggle = await fetchTask(id)
  const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "content-type":"application/json"
    },
    body: JSON.stringify(updateTask)
  })

  setTasks(
    tasks.map((task) => 
      task.id === id ? {...task, reminder: !task.reminder} : task
    )
  )
}

const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()
  setTasks([...tasks, data])

}

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data
}

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} title="Task Tracker" showAddTask={showAddTask} />
      <Route path="/" exact render={(props) => (
        <>
          {showAddTask && <AddTask onAdd={addTask} />}
          <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask}></Tasks>
        </>
      )}/>
      <Route path='/about' component={About}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
