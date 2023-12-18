const express = require('express');
const Task = require('../models/task');
const router = express.Router();

async function validateTask(req, res, next) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new Error('Task not found');
        }
        res.task = task;
        next();
    } catch (err) {
        res.json({ message: err.message });
    }
}

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.json({ message: 'Error fetching tasks: ' + err.message });
    }
});

// GET one task
router.get('/:id', validateTask, (req, res) => {
    res.json(res.task);
});

// CREATE a new task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
    });
    try {
        const newTask = await task.save();
        res.json(newTask);
    } catch (err) {
        res.json({ message: 'Error creating task: ' + err.message });
    }
});

// UPDATE a task
router.put('/:id', validateTask, async (req, res) => {
    if (req.body.title != null) {
        res.task.title = req.body.title;
    }
    if (req.body.description != null) {
        res.task.description = req.body.description;
    }
    if (req.body.dueDate != null) {
        res.task.dueDate = req.body.dueDate;
    }
    if (req.body.priority != null) {
        res.task.priority = req.body.priority;
    }
    if (req.body.status != null) {
        res.task.status = req.body.status;
    }

    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (err) {
        res.json({ message: 'Error updating task: ' + err.message });
    }
});

// DELETE a task
router.delete('/:id', validateTask, async (req, res) => {
    try {
        await res.task.remove();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.json({ message: 'Error deleting task: ' + err.message });
    }
});

module.exports = router;
