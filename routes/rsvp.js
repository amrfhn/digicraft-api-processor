const express = require('express');
const router = express.Router();
const Rsvp = require('../models/RsvpModel');

// GET all RSVPs for a project
router.get('/:projectId', async (req, res) => {
    try {
        const records = await Rsvp
            .find({ projectId: req.params.projectId })
            .sort({ createdAt: -1 });
        res.status(200).json({ data: records });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new RSVP for a project
router.post('/:projectId', async (req, res) => {
    try {
        const doc = await Rsvp.create({ ...req.body, projectId: req.params.projectId });
        res.status(201).json({ message: 'RSVP added successfully', data: doc });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE an RSVP
router.delete('/:projectId/:id', async (req, res) => {
    try {
        const result = await Rsvp.deleteOne({ _id: req.params.id, projectId: req.params.projectId });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


// Getting all based on collectionId (tableName)
router.get('/:collectionId', async (req, res) => {
    console.log('GET ALL RSVPs..')
    
    const { collectionId } = req.params;

    try {
        // Validate if table (collection) exists
        const exists = await isTableExists(collectionId);
        if (!exists) {
            return res.status(404).json({ error: `Table '${collectionId}' does not exist` });
        }

        // Dynamically create a model for the existing table
        const TableModel = mongoose.model(collectionId, rsvpSchema, collectionId);

        // Retrieve all data from the table
        const records = await TableModel.find({});
        res.status(200).json({ data: records });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

// Create dynamic table
router.post('/create/:collectionId', async (req, res) => {
    console.log('CREATE TABLE RSVP..')

    const { collectionId } = req.params

    const data = {
        name: 'test01',
        phoneNumber: 'test01',
        guestType: 'test01',
        numberPax: 0,
        projectId: collectionId
    }

    try {
        // Validate if table (collection) exists
        const exists = await isTableExists(collectionId);
        if (exists) {
            return res.status(400).json({ error: 'Table already exists' });
        }

        // Dynamically create a table
        const TableModel = mongoose.model(collectionId, rsvpSchema);

        // Add default sample data to the table
        const newDocument = await TableModel.create(data);
        res.status(201).json({ message: 'Data added to table', data: newDocument });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating table or adding data');
    }
})

// Creating one data
router.post('/add/:collectionId', async (req, res) => {
    console.log('CREATE RSVP..')

    const { collectionId } = req.params;
    const data = req.body;

    try {
        const exists = await isTableExists(collectionId);
        if (!exists) {
            return res.status(404).json({ error: `Table '${collectionId}' does not exist` });
        }

        // Dynamically create a model for the existing table
        const TableModel = mongoose.model(collectionId, rsvpSchema, collectionId);

        // Add data to the table
        const newDocument = await TableModel.create(data);
        res.status(201).json({ message: 'Data added successfully', data: newDocument });
    } catch (error) {
        console.error('Error adding data to table:', error);
        res.status(500).json({ error: 'Error adding data to table' });
    }
})

// Deleting one
router.delete('/delete/:collectionId/:id', async (req, res) => {
    console.log('DELETE RSVP..')

    const { collectionId, id } = req.params;

    try {
        const model = getModel(collectionId);
        // Delete the document by documentId
        const result = await model.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).send('Document not found');
        }

        res.status(200).send('Document deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;