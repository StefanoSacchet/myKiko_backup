var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
const animal = new Schema({
	nome: String,
    razza: String,
    eta: Number,
    peso: Number,
    codiceChip: String,
    infoSpecie: String,
    immagine: String
})

module.exports = mongoose.model('User3', new Schema({
	email: String,
	password: String,
	animale: [animal]
}))