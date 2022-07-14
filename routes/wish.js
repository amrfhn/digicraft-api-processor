const express = require('express');
const router = express.Router();
const Wish = require('../models/wishCard');

router.get('/', async (req, res) => {
    try {
        const wishCardList = await Wish.find()
        res.json(wishCardList);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;