const Task = require('../../models/Task');
const User = require('../../models/User');

/**
 * Method    DELETE
 * Endpoint  /api/delete-task/:task-id
 */
function deleteTask (req, res) {
    Task.findByIdAndDelete(req.params.uid).exec((err, task) => {
        if (err) {
            return res.json(err);
        }
        
        User
            .findById(task.creator)
            .exec((err, user) => {
                if (err) {
                    return res.json(err);
                }

                user.tasks.pull(task);
                user.save();
            });

        return res.send(`Task successfuly deleted`);
    });

}

module.exports = deleteTask;
