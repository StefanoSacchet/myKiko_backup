var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('animale', new Schema({
	nome: String,
    razza: String,
    eta: Number,
    peso: Number,
    codiceChip: String
}))