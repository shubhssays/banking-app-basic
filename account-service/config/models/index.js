'use strict';
require("dotenv").config()
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../database/dbConnect')[env];

// Create an instance of sequelize
const sequelize = new Sequelize(config);

// Validate and connect to the database
sequelize.authenticate()
    .then(() => console.log(`Successfully connected to ${config.database}!`))
    .catch((error) => console.log(`Failed to connect ${config.database}: ${error}`));

module.exports = sequelize;