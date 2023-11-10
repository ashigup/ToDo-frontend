import React, { useEffect, useState } from 'react'

// interface Task{
//   name: String,
//   taskId: String,
//   status: "STARTED" | "PROGRESS" | "DONE"
// }

const App = () => {
  const [tasks, setTasks]= useState([]);
  const [newTask, setNewTask] = useState("");
  const [refresh, setRefresh] = useState(false);
  const fetchData = () => {
    fetch("https://todo-backend-xlze.onrender.com/api/v1/todos").then(res => res.json()).then(res => {
      setTasks(res);
      console.log("Here in 6", res);
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
 fetchData();
  },[refresh])
  return (
    <div>
      <input type='text' placeholder='Enter new task to add' value={newTask} onChange={(evt) => setNewTask(evt.target.value)}/> <button onClick={async () => {
    const url = 'https://todo-backend-xlze.onrender.com/api/v1/todos/create-task';

    const data = {
      task: newTask
    };
    
    await fetch(url, {
        method: 'POST',
        headers: {
            // 'Accept': 'JSON"',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    setNewTask("");
    setRefresh(prev => !prev)
      }}> Add Task</button>
      <ol>
      {tasks.map(task => <li key={task.taskId} onClick={() => {
        
         fetch("https://todo-backend-xlze.onrender.com/api/v1/todos/delete", {
            method: 'POST',
            headers: {
                // 'Accept': 'JSON"',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        setRefresh(prev => !prev)
      }}> 
         {task.name} 
     </li>)} 
      </ol>
      Hello There
    </div>
  )
}

export default App
