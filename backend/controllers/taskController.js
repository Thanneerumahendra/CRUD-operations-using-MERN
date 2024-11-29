const { createFilter } = require("vite");
const Task = require("../model/taskModel");

// Create a task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get all tasks
const getTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
const getOneTask=async(req,res)=>{
    
    try {
        const{id}=req.params
        const task=await Task.findById(id)
        if(!task){
            return res.status(404).json(`no task found: ${id}`)
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:reportError.message})
    }
    
}
//delete task
const deleteTask=async (req,res) => {
    try {
        const {id}=req.params
        const task=await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json(`no task found: ${id}`)
        }
        res.status(200).send(`task deleted`)
    } catch (error) {
        res.status(500).json({msg:reportError.message});
    }
}

// upadate task

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!task) {
            return res.status(404).json(`no task found: ${id}`);
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    createTask,
    getTask,
    getOneTask,
    deleteTask,
    updateTask,
};