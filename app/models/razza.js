var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('razza', new Schema({
    razza: String,
    infoSpecie: String,
    immagine: String
}));