const express = require('express');
const router = express.Router();
const apiQueries = require('../db/api_queries');

router.get('/', async (req, res) => {
    try {
        const response = await apiQueries.getTrashCans();
        res.status(200).send(response);
    } catch (err) {
        res.status(500).json({
            message: "500 Internal Server Error",
            details: err
        });
    }
});

router.get('/bin/:binId', async (req, res) => {
    const binId = req.params.binId;

    try {
        const response = await apiQueries.getTrashCan(binId);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).json({
            message: "500 Internal Server Error",
            details: err
        });
    }
});

router.put('/bin/:binId', async (req, res) => {
    // Update bin metadata
});

router.get('/unconfigured', async (req, res) => {
    try {
        const response = await apiQueries.getUnconfiguredTrashCan();
        res.status(200).send(response[0]);
    } catch (err) {
        res.status(500).json({
            message: "500 Internal Server Error",
            details: err
        });
    }
});

router.post('/configure', async (req, res) => {
    const { hardwareId, name, maxDistance, locationId } = req.body;

    // Validate request body
    if (!(hardwareId && name && maxDistance)) {
        res.status(400).json({
            message: "Missing parameter(s)"
        });
        return;
    }

    try {
        const isTrashCanConfigured = await apiQueries.addTrashCanMetadata(hardwareId, name, maxDistance, locationId);
        const isGrafanaPanelAdded = true;   // TODO: Do the actual thing
        const isGrafanaIdLinked = true;

        if (!(isTrashCanConfigured && isGrafanaPanelAdded && isGrafanaIdLinked)) {
            res.status(500).json({
                message: "Internal server error",
                details: {
                    isTrashCanConfigured: isTrashCanConfigured,
                    isGrafanaPanelAdded: isGrafanaPanelAdded,
                    isGrafanaIdLinked: isGrafanaIdLinked
                }
            });
            return;
        }

        res.status(200).json({
            message: "Trash can configured successfully."
        });
    } catch (err) {
        res.send(500).json({
            "message": "Internal server error",
            "details": err
        });
        throw err;
    }
});

module.exports = router;