const Task = require('../../models/Task');

/**
 * Method    PUT
 * Endpoint  /api/update-task/:task-id
 */
function updateTask (req, res) {
    const { newIndex } = req.body;

    const tasks = Task
        .find({})
        .exec((err, tasks) => {
            return tasks.map(task => {
                if (task.creator === req.params.uid) {
                    task.orderIndex = newIndex;
                    task.save();
                }
            });
        });

    res.json({tasks});
}

module.exports = updateTask;