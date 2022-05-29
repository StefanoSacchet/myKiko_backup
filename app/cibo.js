const express = require('express');
const router = express.Router();
const User = require("./models/user");
const Razza = require('./models/razza');// get our mongoose model

/*INFO ALIMENTAZIONE RAZZA*/
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

/*TIPOLOGIE DI CIBO*/
router.get('/tipiCibo', async function(req,res){

    //Find the user
    let user = await User.findOne({
        email: req.query.email
    }).exec();

    //User nod found
    if (!user) {
		res.json({ success: false, message: 'User not found.' });
	}else{

        res.status(200).json({
            success: true,
            cibo: user.cibo
        });
    }
});

/*MODIFICA VALORE CIBO*/
router.put('/modificaValoreCibo', async function(req,res){
    
    let userEmail = req.body.email;
    let nomeProdotto = req.body.nomeProdotto;
    let valoreNew = req.body.valoreNew;

    console.log("pd");

    // find the user
	let user = await User.findOne({
        email: userEmail
	    }).exec();

        if(!user){
            res.json({ success: false, message: 'User not found' })
        }else{

            user = await User.updateOne( { email: userEmail, "cibo.nomeProdotto": nomeProdotto }, { $set: { "cibo.$.quantita": valoreNew} } );
            
            console.log(user);
    
            if(user.acknowledged == true){
                res.status(200).json({ success: true, message: 'Changes applyed' })
            }else{
                res.json({ success: false, message: 'Error. Changes not applayed' })
            }
        }
    });






module.exports = router;