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
    email: 'prova1',
    password: '1',
    animale: [{
        nome: 'Theodore',
        razza: 'gatto',
        eta: 7,
        peso: 8.1,
        codiceChip: 'abc',
        infoSpecie: "Il gatto domestico è un mammifero carnivoro appartenente alla famiglia dei felidi. Dall’indole essenzialmente territoriale e crepuscolare, il gatto è un" +
        "predatore di piccoli animali, specialmente roditori. Per comunicare utilizza vari vocalizzi, le fusa, le posizioni del corpo e i feromoni. Prevalentemente domestico," +
        "il gatto può essere addestrato ad accettare istruzioni semplici e può imparare da solo a manipolare svariati meccanismi, anche complessi, tra cui le maniglie delle porte" +
        "o le chiusure delle gabbie."
    }, {
        nome: 'Ariel',
        razza: 'gatto',
        eta: 7,
        peso: 6.2,
        codiceChip: '123',
        infoSpecie: "Il gatto domestico è un mammifero carnivoro appartenente alla famiglia dei felidi. Dall’indole essenzialmente territoriale e crepuscolare, il gatto è un" +
        "predatore di piccoli animali, specialmente roditori. Per comunicare utilizza vari vocalizzi, le fusa, le posizioni del corpo e i feromoni. Prevalentemente domestico," +
        "il gatto può essere addestrato ad accettare istruzioni semplici e può imparare da solo a manipolare svariati meccanismi, anche complessi, tra cui le maniglie delle porte" +
        "o le chiusure delle gabbie."
    }]
}).save();*/