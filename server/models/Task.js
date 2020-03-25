const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    text: { type: String, required: true, unique: true, trim: true },
    completed: { type: Boolean, default: false },
    createdDateAndTime: { 
        date: { type: String, default: '', trim: true },
        time: { type: String, default: '', trim: true },
     },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderIndex: { type: Number, default: 0 }
});

module.exports = mongoose.model('Task', TaskSchema);
