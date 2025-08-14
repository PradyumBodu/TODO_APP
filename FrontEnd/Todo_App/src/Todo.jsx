import React, { useEffect, useState } from 'react';
import './Todo.css';
import axios from 'axios';
import axiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';


function Todo() {

  const[task,setTask]=useState('')
  const[tasks,setTasks]=useState([])
  const[taskid,settaskid] = useState(null)
  const[taskvalue,settaskvalue] = useState('')
  const access = localStorage.getItem('access');
  const navigate = useNavigate();

  useEffect(() => {

    const fetchTask = async()=>{
      try{
        const res = await axiosInstance.get('todos/')
        setTasks(res.data)
      }catch(err){
        console.log(err);
      }
    }
    fetchTask();
  },[])

  const subitHandler = async () => {
    if (!task) return; 

    try{
      const res = await axiosInstance.post('todos/',{task});
      setTasks([...tasks, res.data]);
      setTask('');
    }catch(err){
      console.log(err)
    }
}


const activeTask = tasks.filter(task=>!task.is_complete);
const Completetask = tasks.filter(task => task.is_complete);


const deletehandler = async(id)=>{
  try{

    await axiosInstance.delete(`todos/${id}/`)  
    setTasks(tasks.filter(task => task.id !== id))
  }catch(err){
    console.log(err);
    
  }
}

const toggleComplete = async (id,status) => {
  try{
    const res = await axiosInstance.patch(`todos/${id}/`,{
      is_complete: !status
    })
    setTasks(tasks.map(task => task.id === id ? res.data : task))
  }catch(err){
    console.log(err)
  }
}

const updatehandler = async (id,task) => {
  settaskid(id);
  settaskvalue(task) 
}


const savehandler = async (id) => {
  try{
    const res = await axiosInstance.patch(`todos/${id}/`,{
      task:taskvalue
    });
    setTasks(tasks.map((task)=> task.id === id ? res.data : task))
    settaskid(null)
    settaskvalue('')
  }catch(err){
    console.log(err);
    
  }
}

const logoutHandler = ()=>{
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  navigate('/login')
}

  return (
    <div>  
      <h1 className="todoh1">TODO</h1>

      <div style={{ display:'flex', justifyContent:'end' }}>
      <button onClick={logoutHandler} style={{ padding: '5px 10px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>

      <div className="div1">
        <input type="text" placeholder="Enter your task" value={task} onChange={(e)=>setTask(e.target.value)}/>
        <button onClick={subitHandler}>Submit</button>
      </div>

      <div className="div2">
        
        <div className="div2-1">
          <h3>Your Task</h3>
          {activeTask.map(data => (
          <div className="task-list" key={data.id}>
            <div className="div2-1-2">
              <input type="checkbox" className="check" checked={data.is_complete}
                onChange={() => toggleComplete(data.id, data.is_complete)} />
              
              {taskid === data.id ?
                <input type="text" className="in" value={taskvalue} onChange={(e)=>settaskvalue(e.target.value)} />
                :<input type="text" className="in" value={data.task} readOnly />
              } 
              
              <div className="icon">
                {taskid === data.id ?
                <i
                      className="fa-solid fa-check"
                      onClick={() => savehandler(data.id)}
                    ></i>
                :<i className="fa-solid fa-pen" onClick={()=>updatehandler(data.id,data.task)}></i>
                }
                <i className="fa-solid fa-trash" onClick={()=>deletehandler(data.id)}></i>
              </div>
            </div>
          </div>
          ))}
        </div>

        {/* Completed Task section */}
        <div className="div2-1">
          <h3>Completed Task</h3>
          {Completetask.map(data => (
          <div className="completed-task-list" key={data.id}>
            <div className="div2-1-2">
              <input type="checkbox" className="check" checked={data.is_complete}
                onChange={() => toggleComplete(data.id, data.is_complete)}  />
              <input type="text" className="in" value={data.task} readOnly />
              <div className="icon">
                <i className="fa-solid fa-trash" onClick={()=>deletehandler(data.id)}></i>
              </div>
            </div>
            {/* more completed tasks go here */}
          </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Todo;
