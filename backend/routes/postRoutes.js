const express = require('express');
const router = express.Router();
const LostDog = require('../models/LostDog');
const FoundDog = require('../models/FoundDog');
const path = require('path');

// Assuming uploads are handled by cloud storage or need to be served via a static URL
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'; // Fallback for local dev

// ============================================ Get new posts count
router.get('/new-posts-count', async (req, res) => {
    try {
        const newLostDogsCount = await LostDog.countDocuments({ isNew: true });
        const newFoundDogsCount = await FoundDog.countDocuments({ isNew: true });
        const newPostsCount = newLostDogsCount + newFoundDogsCount;
        res.json({ newPostsCount });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching new posts count' });
    }
});

// ============================================ Get new posts (Lost & Found Dogs)
router.get('/new-posts', async (req, res) => {
    try {
        const newLostDogs = await LostDog.find({ isNew: true });
        const newFoundDogs = await FoundDog.find({ isNew: true });

        // Combine lost and found dogs
        const notifications = [
            ...newLostDogs.map(dog => ({
                ...dog.toObject(),
                imagePath: dog.imagePath ? `${BASE_URL}${dog.imagePath}` : null
            })),
            ...newFoundDogs.map(dog => ({
                ...dog.toObject(),
                imagePath: dog.imagePath ? `${BASE_URL}${dog.imagePath}` : null
            }))
        ];

        res.json({ notifications });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching new posts' });
    }
});

module.exports = router;
