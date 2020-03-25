const router = require('express').Router();

const getAllTasks = require('../controllers/taskControllers/getAllTasks');
const createTask = require('../controllers/taskControllers/createTask');
const updateTask = require('../controllers/taskControllers/updateTask');
const updateTaskOrder = require('../controllers/taskControllers/updateTaskOrder');
const toggleTaskDone = require('../controllers/taskControllers/toggleTaskDone');
const deleteTask = require('../controllers/taskControllers/deleteTask');

router.get('/all-tasks/:uid', getAllTasks);
router.post('/create-task', createTask);
router.put('/update-task/:uid', updateTask);
router.put('/update-task-order/:uid', updateTaskOrder);
router.put('/toggle-task/:uid', toggleTaskDone);
router.delete('/delete-task/:uid', deleteTask);

module.exports = router;
