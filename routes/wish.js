const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wish = require('../models/WishModel');

// GET all wishes for a project
router.get('/:projectId', async (req, res) => {
    console.log(`[wish] GET /${req.params.projectId} — db state: ${mongoose.connection.readyState}`);
    try {
        const records = await Wish
            .find({ projectId: req.params.projectId })
            .sort({ createdAt: -1 });
        res.status(200).json({ data: records });
    } catch (error) {
        console.error('[wish] GET error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// POST new wish for a project
router.post('/:projectId', async (req, res) => {
    console.log(`[wish] POST /${req.params.projectId} — body:`, req.body, `— db state: ${mongoose.connection.readyState}`);
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'name and message are required' });
    }
    try {
        const doc = await Wish.create({ name, message, projectId: req.params.projectId });
        console.log('[wish] saved:', doc._id);
        res.status(201).json({ message: 'Wish added successfully', data: doc });
    } catch (error) {
        console.error('[wish] POST error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// DELETE a wish
router.delete('/:projectId/:id', async (req, res) => {
    try {
        const result = await Wish.deleteOne({ _id: req.params.id, projectId: req.params.projectId });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


// GET all wishes for a project
router.get('/:projectId', async (req, res) => {
    try {
        const records = await Wish
            .find({ projectId: req.params.projectId })
            .sort({ createdAt: -1 });
        res.status(200).json({ data: records });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new wish for a project
router.post('/:projectId', async (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'name and message are required' });
    }
    try {
        const doc = await Wish.create({ name, message, projectId: req.params.projectId });
        res.status(201).json({ message: 'Wish added successfully', data: doc });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a wish
router.delete('/:projectId/:id', async (req, res) => {
    try {
        const result = await Wish.deleteOne({ _id: req.params.id, projectId: req.params.projectId });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


// Getting all based on collectionId (tableName)
router.get('/:collectionId', async (req, res) => {
    console.log('GET ALL WISHES..')

    const { collectionId } = req.params;

    try {
        // Validate if table (collection) exists
        const exists = await isTableExists(collectionId);
        if (!exists) {
            return res.status(404).json({ error: `Table '${collectionId}' does not exist` });
        }

        // Dynamically create a model for the existing table
        const TableModel = mongoose.model(collectionId, wishSchema, collectionId);

        // Retrieve all data from the table
        const records = await TableModel.find({});
        res.status(200).json({ data: records });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Create dynamic table
router.post('/create/:collectionId', async (req, res) => {
    console.log('CREATE TABLE WISHES..', req.params.collectionId)

    const { collectionId } = req.params;

    const data = {
        name: 'test01',
        message: 'test01',
        projectId: collectionId
    }

    try {
        // Validate if table (collection) exists
        const exists = await isTableExists(collectionId);
        if (exists) {
            return res.status(400).json({ error: 'Table already exists' });
        }

        // Dynamically create a table
        const TableModel = mongoose.model(collectionId, wishSchema);

        // Add default sample data to the table
        const newDocument = await TableModel.create(data);
        res.status(201).json({ message: 'Data added to table', data: newDocument });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Creating one data
router.post('/add/:collectionId', async (req, res) => {
    console.log('CREATE WISH..')

    const { collectionId } = req.params;
    const data = req.body;

    try {
        const exists = await isTableExists(collectionId);
        if (!exists) {
            return res.status(404).json({ error: `Table '${collectionId}' does not exist` });
        }

        // Dynamically create a model for the existing table
        const TableModel = mongoose.model(collectionId, wishSchema, collectionId);

        // Add data to the table
        const newDocument = await TableModel.create(data);
        res.status(201).json({ message: 'Data added successfully', data: newDocument });
    } catch (error) {
        console.error('Error adding data to table:', error);
        res.status(500).json({ error: 'Error adding data to table' });
    }
})

module.exports = router;