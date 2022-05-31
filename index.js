const app = require('./app/app.js');
const mongoose = require('mongoose');

const User = require('./app/models/user');
const Razza = require('./app/models/razza');

const port = process.env.PORT || 8080;

app.locals.db = mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected Database");
        app.listen(port, () => {
            console.log("Server listening on port " + port);
        })
    });

/*AGGIUNGE USER AL DATABSE*/
/*new User({
    email: 'prova2',
    password: '2',
    animale: [{
        nome: 'Packy',
        razza: 'pappagallo',
        eta: 2,
        peso: 1.2,
        codiceChip: 'fff',
        immagine: '/images/pappagallo.jpg'
    }, {
        nome: 'Bobo',
        razza: 'cane',
        eta: 4,
        peso: 9.2,
        codiceChip: 'aaa',
        immagine: '/images/cane.jpg'
    }],
    impegni: [{
        impegno: 'Toiletatura',
        animale: 'Packy',
        luogo: 'Clinica Maske',
        data: new Date("2022-11-13T11:22:33Z")
    }, {
        impegno: 'Passeggiata',
        animale: 'Bobo',
        luogo: 'Parco melta',
        data: new Date("2024-02-01T23:11:59Z")
    }],
    cibo: [{
        nomeProdotto: 'monge',
        quantita: 50
    },{
        nomeProdotto: 'royal canin',
        quantita: 20
    }]
}).save();*/

/*AGGIUNGE RAZZA AL DATABSE*/
/*
new Razza({
    razza: 'carlino',
    infoSpecie: "Decisamente quadrato e raccolto, è il “multum in parvo “ dimostrato nella compattezza di forme, struttura ben solida e muscolatura potente. Il Carlino è un cane che adora stare in casa e che non ama essere lasciato in solitudine. La condivisione di momenti felici con il proprietario è tutto per lui. È un cane di grande compagnia che si adatta facilmente alla vita con altri cani e instaura un rapporto amichevole anche con gli sconosciuti. Adora giocare e dispone di un discreto livello di energia e vigorosità. Ama molto giocare anche con i bambini. Può sviluppare la tendenza a ingrassare, bisogna, quindi, garantirgli una discreta quantità di esercizi quotidiani. I costi per il mantenimento rientrano nella media.",
    immagine: '/images/carlino.jpg'
}).save();
*/