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
/*new User({
    email: 'bella',
    password: '456',
    animale: [{
        nome: 'bubi',
        razza: 'cane',
        eta: 14,
        peso: 13,
        codiceChip: 'fff'
    }, {
        nome: 'bobo',
        razza: 'pappagallo',
        eta: 2,
        peso: 0.8,
        codiceChip: 'ppp'
    }]
}).save();*/