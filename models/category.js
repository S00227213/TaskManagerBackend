const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Category = require('./category');

// GET all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.json({ message: err.toString() });
    }
});

// Endpoint to get tasks filtered by priority
router.get('/filter', async (req, res) => {
    const priorityFilter = req.query.priority;

    try {
        let filteredTasks;
        if (priorityFilter) {
            filteredTasks = await Task.find({ priority: priorityFilter });
        } else {
            filteredTasks = await Task.find();
        }
        res.json(filteredTasks);
    } catch (err) {
        res.json({ message: err.toString() });
    }
});

module.exports = router;
