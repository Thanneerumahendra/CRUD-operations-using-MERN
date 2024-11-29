import React from 'react'
import TaskForm from './TaskForm'
import Task from './Task'
import { toast } from 'react-toastify';
import { useState,useEffect } from 'react'
import {URL} from "../App"
import axios from "axios"
import loadingImg from "../assets/loader.gif"

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [completedTask, setCompletedTask] = useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [formData,setFormData]=useState({
    name:'',
    completed:false
  })
  const [isEditing,setIsEditing]=useState(false)
  const [taskId,setTaskId]=useState("")

  const {name}=formData
  const handleInputChange=(e)=>{
    const {name,value}=e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }


  const getTasks=async () => {
    setIsLoading(true)
    try {
      const {data}=await axios.get(`${URL}/api/tasks`)
      setTasks(data)
      setIsLoading(false)
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
      
    }
  }

  const deleteTask=async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`)
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
    
  }

  useEffect(()=>{
    getTasks()
  })

  const createTask=async (e) => {
    e.preventDefault()
    if(name===""){
      return toast.error('Input should not empty')
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData)
      setFormData({...formData,name:""})
      toast.success('Task created successfully')
      getTasks()
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      
    }
    
  }

  const getSingleTask=async (task) => {
    setFormData({
      name:task.name,
      completed:false
    })
    setTaskId(task._id)
    setIsEditing(true)
  }

  const updateTask=async (e) => {
    e.preventDefault()
    if(name===""){
      return toast.error('Input should not empty')
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData)
      setFormData({...formData,name:""})
      setIsEditing(false)
      getTasks()
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div >
      <h2>Task Manger</h2>
      <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} updateTask={updateTask} />
      <div className='--flex-between --pb'>
        <p>
          <b>Total Tasks:</b> 0
        </p>
        <p>
          <b>Completed Tasks:</b> 0
        </p>
      </div>
      <hr/>
      {
        isLoading && (
          <div className='--flex-center'>
            <img src={loadingImg} alt="loading.."/>
            </div>
        )
      }

      {
        !isLoading && tasks.length===0 ? (
          <p className='--py'>no task is added please enter the task</p>
        ):(
          <>
          {tasks.map((task, index) => {
            return <Task key={task._id} task={task} index={index} deleteTask={deleteTask}
            getSingleTask={getSingleTask}
            />
          })}
        </>
        )
      }
    </div>
  )
}

export default TaskList
