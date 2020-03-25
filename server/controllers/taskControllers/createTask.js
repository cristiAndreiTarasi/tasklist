
const Task = require('../../models/Task');
const User = require('../../models/User');

/**
 * Method    POST
 * Endpoint  /api/create-task
 */
function createTask (req, res) {
    const { text, completed, createdDateAndTime, creator, orderIndex } = req.body;

    Task.findOne({ text }, (_, task) => {
        if (task) {
            return res.send('Task exists already');
        }
    });

    User
        .findById(creator)
        .exec((err, user) => {
            const newTask = new Task({ 
                text, 
                completed, 
                createdDateAndTime, 
                creator, 
                orderIndex: user.tasks.length,
            });

            newTask.save((err) => {
                if (err) {
                    return res.send(`Task wasn't saved`);
                }

                res.send(`Task successfuly created`);
            });

            user.tasks.push(newTask);
            user.save();
        });
};

module.exports = createTask;




