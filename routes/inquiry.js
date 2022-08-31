const express = require('express');
const router = express.Router();
const Inquiry = require('../models/inquiry');

// post
router.post('/', async (req, res) => {
    const inquiryData = new Inquiry({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        subject: req.body.subject,
        description: req.body.description
    })

    try {
        const newInquiry = await inquiryData.save();
        res.status(201).json(newInquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// get
/**
router.get('/', async (req, res) => {
    try {
        const wishCardList = await Wish.find()
        res.json(wishCardList);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
**/

module.exports = router;