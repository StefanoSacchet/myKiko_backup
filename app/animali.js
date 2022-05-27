const express = require('express');
const router = express.Router();
const User = require('./models/user');// get our mongoose model
const Razza = require('./models/razza');// get our mongoose model

/*INFO ANIMALE*/
router.get('/infoAnimale', async function(req,res){

    //Find the user
    let user = await User.findOne({
        email: req.query.email
    }).exec();

    //User nod found
    if (!user) {
		res.json({ success: false, message: 'Authentication failed. User not found.' });
	}else{

        res.status(200).json({
            success: true,
            animale: user.animale
        });
    }
})


/*INFO RAZZA*/
router.get('/infoRazza', async function(req,res){

    let razza = await Razza.findOne({
        razza: req.query.razza
    }).exec();

    if(!razza){
        res.json({ success: false, message: 'Razza not found' });
    }else{

        res.status(200).json({
            success: true,
            infoRazza: razza.infoSpecie,
            imgRazza: razza.immagine
        });
    }
})


/*AGGIUNGI ANIMALE*/
router.post('/aggiungiAnimale', async function(req,res){

    let userEmail = req.body.email;
    let nomeNew = req.body.nomeNew;
    let razzaNew = req.body.razzaNew;
    let etaNew = req.body.etaNew;
    let pesoNew = req.body.pesoNew;
    let codiceChipNew = req.body.codiceChipNew;

    if(nomeNew == "" || razzaNew == "" || etaNew == "" || pesoNew == "" || codiceChipNew == ""){
        res.status(400).json({ success: false, message: 'Empty inputs' })
    }else{

        //Find the user
	    let user = await User.findOne({
		    email: userEmail
	    }).exec();

        if(!user){
            res.json( { success: false, message: 'User not found' } )
        }else{

            user = await User.updateOne( { email: userEmail }, { $push: { "animale": {nome: nomeNew, razza: razzaNew, eta: etaNew, peso: pesoNew, codiceChip: codiceChipNew} } });

            //console.log(user);
    
            if(user.acknowledged == true){
                res.status(201).json({ success: true, message: 'Data inserted' })
            }else{
                res.json({ success: false, message: 'Error. add failed' })
            }
        }
    }
});


/*MODIFICA INFO ANIMALE*/
router.put('/modificaInfoAnimale', async function(req,res){
    
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

        // find the user
	    let user = await User.findOne({
		    email: userEmail
	    }).exec();

        if(!user){
            res.json({ success: false, message: 'User not found' })
        }else{

            user = await User.updateOne( { email: userEmail, "animale._id": idAnimale }, { $set: { "animale.$.nome": nomeNew } } );
            user = await User.updateOne( { email: userEmail, "animale._id": idAnimale }, { $set: { "animale.$.razza": razzaNew } } );
            user = await User.updateOne( { email: userEmail, "animale._id": idAnimale }, { $set: { "animale.$.eta": etaNew } } );
            user = await User.updateOne( { email: userEmail, "animale._id": idAnimale }, { $set: { "animale.$.peso": pesoNew } } );
            user = await User.updateOne( { email: userEmail, "animale._id": idAnimale }, { $set: { "animale.$.codiceChip": codiceChipNew } } );
    
            //console.log(user);
    
            if(user.acknowledged == true){
                res.status(200).json({ success: true, message: 'Changes applyed' })
            }else{
                res.json({ success: false, message: 'Error. Changes not applayed' })
            }
        }
    }
});


/*DELETE ANIMALE*/
router.delete('/deleteAnimale', async function(req,res){

    //console.log(req.body.idImpegno);

    // find the user
	let user = await User.findOne({
		email: req.body.email
	}).exec();

    if(!user){
        res.json({ success: false, message: 'Delete failed. User not found.' });
    }else{

        user = await User.updateOne( { email: req.body.email }, { $pull: { "animale": {_id: req.body.idAnimale} } });

        //console.log(user);

        if(user.acknowledged == true){
            res.status(200).json({ success: true, message: 'Animale deleted' })
        }else{
            res.json({ success: false, message: 'Delete failed' })
        }
    }
});

module.exports = router;