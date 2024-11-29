const express=require('express');
const Task = require('../model/taskModel');
const router = express.Router();
const { createTask, getTask, getOneTask,deleteTask ,updateTask} = require('../controllers/taskController');



router.route('/').get(getTask).post(createTask)
router.route('/:id').get(getOneTask).delete(deleteTask).put(updateTask)


// router.post('/',createTask)
// router.get('/', getTask)
// router.get('/:id', getOneTask)
// router.delete('/:id', deleteTask)
// router.put('/:id', updateTask);


module.exports=router;