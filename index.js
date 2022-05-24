const app = require('./app/app.js');
const mongoose = require('mongoose');

const User = require('./app/models/user');

const port = process.env.port || 8080;

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
        infoSpecie: "Gli psittaciformi sono un ordine di uccelli neorniti comprendente numerose specie di animali noti col nome comune di" +
        "pappagalli.Con quattro famiglie l'ordineè ben diffuso e rappresentato nelle aree tropicali e subtropicali della maggior parte del" + 
        "Pianeta: in particolare, picchi di biodiversità vengono raggiunti in AmericaMeridionale ed Australasia. Alcune specie sono native" + 
        "delle aree temperate dell'emisfero australe.",
        immagine: '/images/pappagallo.jpg'
    }, {
        nome: 'Bobo',
        razza: 'cane',
        eta: 4,
        peso: 9.2,
        codiceChip: 'aaa',
        infoSpecie: "Il cane è un mammifero appartenente all'ordine Carnivora, della famiglia dei canidi. Con l'avvento dell'addomesticamento" + 
        "si è distinto dal lupo di cui èconsiderato una sottospecie. Si tratta di un canino di taglia da piccola a grande. Il colore varia a" + 
        "seconda della discendenza: bianco, nero, rosso, marrone, ecc.La coda varia in forma e lunghezza; in alcune razze è assente.",
        immagine: '/images/cane2.jpeg'
    }]
}).save();*/