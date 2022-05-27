const express = require('express');
const app = express();

const impegni = require('./impegni.js');
const aggiungiImpegno = require('./aggiungiImpegno.js');
const deleteImpegno = require('./deleteImpegno.js');
const infoAlimentazione = require('./infoAlimentazione.js');
const modificaImpegno = require('./modificaImpegno.js');

const animali = require('./animali.js');
const userAccount = require('./userAccount.js');

//Configure Express.js parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Serve front-end static files
app.use('/', express.static('static'));

//Apis for user account
app.use('/api/v1/userAccount',userAccount);

//Apis for animali
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

//Default 404 handler
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;