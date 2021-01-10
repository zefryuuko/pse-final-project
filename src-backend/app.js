const express = require('express');
const dotenv = require('dotenv');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes