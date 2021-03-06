var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model

const food = new Schema({
    nomeProdotto: String,
    quantita: Number
})

const task = new Schema({
    impegno: String,
    animale: String,
    luogo: String,
    data: Date
})

const animal = new Schema({
	nome: String,
    razza: String,
    eta: Number,
    peso: Number,
    codiceChip: String,
    infoSpecie: String,
    immagine: String
})

module.exports = mongoose.model('User5', new Schema({
	email: String,
	password: String,
	animale: [animal],
    impegni: [task],
    cibo: [food]
}))