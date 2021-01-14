const express = require('express');
const router = express.Router();
const apiQueries = require('../db/api_queries');

router.get('/', async (req, res) => {
    try {
        const response = await apiQueries.getLocations();
        
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: "500 Internal Server Error",
            details: err
        });
    }
});

router.get('/:locationId', async (req, res) => {
    try {
        const response = await apiQueries.getLocation(req.params.locationId);
        
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: "500 Internal Server Error",
            details: err
        });
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            message: "Missing parameter(s)"
        });
        return;
    }

    try {
        const response = await apiQueries.createLocation(name);
        
        if (!response) {
            res.status(400).json({
                message: "Room with that name already exists"
            });
            return;
        }

        res.status(200).json({
            message: "Room added successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "500 Internal Server Error",
            details: err
        });
    }
});

router.put('/:locationId', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            message: "Missing parameter(s)"
        });
        return;
    }

    try {
        const response = await apiQueries.updateLocation(req.params.locationId, name);
        
        if (!response) {
            res.status(400).json({
                message: "Room with that name already exists"
            });
            return;
        }

        res.status(200).json({
            message: "Room updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "500 Internal Server Error",
            details: err
        });
    }
});

router.delete('/:locationId', async (req, res) => {
    try {
        const response = await apiQueries.deleteLocation(req.params.locationId);
        
        res.status(200).json({
            message: "Location and associated trash cans is removed successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "500 Internal Server Error",
            details: err
        });
    }
});

module.exports = router