const express = require('express');
const router = express.Router();
const User = require('./models/user');// get our mongoose model

router.post('', async function(req,res){

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
		    email: req.body.email
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

module.exports = router;