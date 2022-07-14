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

router.post('/', async (req, res) => {
    const wishCardList = new Wish({
        name: req.body.name,
        message: req.body.message
    })

    try {
        const newWish = await wishCardList.save();
        res.status(201).json(newWish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;