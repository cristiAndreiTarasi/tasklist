const Task = require('../../models/Task');

/**
 * Method    PUT
 * Endpoint  /api/toggle-task/:task-id
 */
function toggleTaskDone (req, res) {
    const { completed } = req.body; 
    
    Task.findByIdAndUpdate(
        req.params.uid,
        { $set: { completed: !completed }},
        { new: true })
        .exec((err, task) => {
            if (err) {
                return res.send(`Task wasn\'t updated`);
            }



            res.json({
                message: !completed ? `Task marked as completed` : `Task marked as incompleted`,
                task
            });
        });
}

module.exports = toggleTaskDone;