const express = require('express');
const router = express.Router();
const apiQueries = require('../db/api_queries');

router.get('/', async (req, res) => {
    
});

router.get('/unconfigured', async (req, res) => {
    try {
        const response = await apiQueries.getUnconfiguredTrashCan();
        res.status(200).send(response[0]);
    } catch (err) {
        res.status(500).json({
            "message": "500 Internal Server Error",
            "details": err
        });
    }
});

router.post('/configure', async (req, res) => {
    // Configure new bin
});

router.get('/bin/:binId', async (req, res) => {
    // Get bin metadata
});

router.put('/bin/:binId', async (req, res) => {
    // Update bin metadata
});

module.exports = router;