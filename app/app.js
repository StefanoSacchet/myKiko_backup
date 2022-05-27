const express = require('express');
const app = express();

const authentication = require('./authentication.js');
const registration = require('./registration.js');
const modificaCredenziali = require('./modificaCredenziali.js');
const deleteAccount = require('./deleteAccount.js');
const impegni = require('./impegni.js');
const aggiungiImpegno = require('./aggiungiImpegno.js');
const deleteImpegno = require('./deleteImpegno.js');
const infoAlimentazione = require('./infoAlimentazione.js');
const modificaImpegno = require('./modificaImpegno.js');

const animali = require('./animali.js');

//Configure Express.js parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Serve front-end static files
app.use('/', express.static('static'));

//Authentication routing and middleware
app.use('/api/v1/authentication', authentication);

//Registration routing and middleware
app.use('/api/v1/registration', registration);

//Change credentials
app.use('/api/v1/modificaCredenziali',modificaCredenziali);

//Delete account
app.use('/api/v1/deleteAccount',deleteAccount);

//api for animali
app.use('/api/v1/animali',animali);

//Get impegni
app.use('/api/v1/impegni',impegni);

//Add impegno
app.use('/api/v1/aggiungiImpegno',aggiungiImpegno);

//Delete impegno
app.use('/api/v1/deleteImpegno',deleteImpegno);

//Get info alimentazione
app.use('/api/v1/infoAlimentazione',infoAlimentazione);

//Modifica impegno
app.use('/api/v1/modificaImpegno',modificaImpegno);

//delete animale
//app.use('/api/v1/deleteAnimale',deleteAnimale);

//Default 404 handler
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;