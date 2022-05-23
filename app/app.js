const express = require('express');
const app = express();

const authentication = require('./authentication.js');
const registration = require('./registration.js');
const infoAnimale = require('./infoAnimale.js');
const modificaCredenziali = require('./modificaCredenziali.js');
const modificaInfoAnimale = require('./modificaInfoAnimale.js');
const aggiungiAnimale = require('./aggiungiAnimale.js');

//Configure Express.js parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Serve front-end static files
app.use('/', express.static('static'));

//Authentication routing and middleware
app.use('/api/v1/authentications', authentication);

//Registration routing and middleware
app.use('/api/v1/registration', registration);

//Info pets
app.use('/api/v1/infoAnimale',infoAnimale);

//Change credentials
app.use('/api/v1/modificaCredenziali',modificaCredenziali);

//Change pet's info
app.use('/api/v1/modificaInfoAnimale',modificaInfoAnimale);

//Add pets
app.use('/api/v1/aggiungiAnimale',aggiungiAnimale);

//Default 404 handler
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;