const Task = require('../../models/Task');

/**
 * Method    PUT
 * Endpoint  /api/update-task/:task-id
 */
function updateTask (req, res) {
    Task.findByIdAndUpdate(
        req.params.uid,
        { $set: { text: req.body.text }},
        { new: true }, 
        (err, task) => {
            if (err) {
                return res.send('What do you need duplicates for?');
            }

            if (task.text === '' ) {
                return res.send('Whats an empty task useful for?.');
            }

            res.send(`Task successfuly updated`);
        });
}

module.exports = updateTask;