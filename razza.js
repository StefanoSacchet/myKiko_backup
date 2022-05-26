var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('razza1', new Schema({
    razza: String,
    infoSpecie: String,
    infoAlimentazione: String,
    immagine: String
    
}));