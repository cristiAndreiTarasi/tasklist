const Task = require('../../models/Task');
const User = require('../../models/User');

/**
 * Method    GET
 * Endpoint  /api/all-tasks
 */
function getAllTasks (req, res) {
    Task
        .find({ creator: req.params.uid})
        .sort({ orderIndex: 1 })
        .exec((err, tasks) => {
            if (!tasks || tasks.length == 0) {
                return res.status(401).json({
                    message: 'No tasks found',
                });
            }

            if (err) {
                res.json({ message: err, });
            }

            res.send(tasks);
        });
}

module.exports = getAllTasks;
