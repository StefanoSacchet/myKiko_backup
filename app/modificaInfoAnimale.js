const express = require('express');
const router = express.Router();
const User = require('./models/user');// get our mongoose model

router.put('', async function(req,res){
    
    let userEmail = req.body.email;
    let idAnimale = req.body.id;
    let nomeNew = req.body.nomeNew;
    let razzaNew = req.body.razzaNew;
    let etaNew = req.body.etaNew;
    let pesoNew = req.body.pesoNew;
    let codiceChipNew = req.body.codiceChipNew;

    if(nomeNew == "" || razzaNew == "" || etaNew == "" || pesoNew == "" || codiceChipNew == ""){
        res.status(400).json({ success: false, message: 'Empty inputs' })
    }else{

        let user = await User.updateOne( { email: userEmail, "animale._id": idAnimale }, { $set: { "animale.$.nome": nomeNew } } );
        user = await User.updateOne( { email: userEmail, "animale._id": idAnimale }, { $set: { "animale.$.razza": razzaNew } } );
        user = await User.updateOne( { email: userEmail, "animale._id": idAnimale }, { $set: { "animale.$.eta": etaNew } } );
        user = await User.updateOne( { email: userEmail, "animale._id": idAnimale }, { $set: { "animale.$.peso": pesoNew } } );
        user = await User.updateOne( { email: userEmail, "animale._id": idAnimale }, { $set: { "animale.$.codiceChip": codiceChipNew } } );

        //console.log(user);

        if(user.acknowledged == true){
            res.status(200).json({ success: true, message: 'Changes applyed' })
        }else{
            res.json({ success: false, message: 'User not found' })
        }
    }
});

module.exports = router;