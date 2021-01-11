const express = require('express');
const router = express.Router();
const apiQueries = require('../db/api_queries');

// router.get('/' ...)

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

module.exports = router;