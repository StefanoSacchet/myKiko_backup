const express = require('express');
const router = express.Router();
const Razza = require('./models/razza');// get our mongoose model

router.get('/infoAlimentazione', async function(req,res){

    let razza = await Razza.findOne({
        razza: req.query.razza
    }).exec();

    if(!razza){
        res.json({ success: false, message: 'Razza not found' });
    }else{

        res.status(200).json({
            success: true,
            infoAlimentazione: razza.infoAlimentazione,
            imgRazza: razza.immagine
        });
    }
})

module.exports = router;