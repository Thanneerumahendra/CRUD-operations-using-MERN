import React from 'react'
import {FaCheckDouble, FaEdit,FaRegTrashAlt } from "react-icons/fa";
const Task = ({ task, index, deleteTask,getSingleTask,updateTask}) => {
  return (
    <div className='task'>
        <p>
            <b>{index+1}. </b>
            {task.name}
        </p>
        <div className='task-icons'></div>
            <FaCheckDouble color="green"/>
            <FaEdit color="purple" onClick={()=>{
              getSingleTask(task)
            }}/>
            <FaRegTrashAlt  color="red" onClick={()=>{
              deleteTask(task._id)
            }}/>

    </div>
  )
}

export default Task
