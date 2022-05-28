const express = require('express');
const app = express();

const infoAlimentazione = require('./infoAlimentazione.js');

const userAccount = require('./userAccount.js');
const animali = require('./animali.js');
const impegniAnimali = require('./impegniAnimali.js');
const cibo = require('./cibo.js');

//Configure Express.js parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Serve front-end static files
app.use('/', express.static('static'));

//Apis for user account
app.use('/api/v1/userAccount',userAccount);

//Apis for animali
app.use('/api/v1/animali',animali);

//Apis impegni animali
app.use('/api/v1/impegniAnimali',impegniAnimali);

//Apis cibo
app.use('/api/v1/cibo',cibo);

//Get info alimentazione
app.use('/api/v1/infoAlimentazione',infoAlimentazione);

//Default 404 handler
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;