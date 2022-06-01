const express = require('express');
const router = express.Router();
const User = require('./models/user');// get our mongoose model

/*IMPEGNI*/
router.get('/impegni', async function(req,res){

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
            impegno: user.impegni
        });
    }
});


/*AGGIUNGI IMPEGNO*/
router.post('/aggiungiImpegno', async function(req,res){

    let userEmail = req.body.email;
    let impegnoNew = req.body.impegnoNew;
    let animaleNew = req.body.animaleNew;
    let luogoNew = req.body.luogoNew;
    let dataNew = req.body.dataNew;

    if(impegnoNew == "" || animaleNew == "" || luogoNew == "" || dataNew == ""){
        res.status(400).json({ success: false, message: 'Empty inputs' })
    }else{

        let user = await User.updateOne( { email: userEmail }, { $push: { "impegni": {impegno: impegnoNew, animale: animaleNew, luogo: luogoNew, data: dataNew} } } );

        if(user.acknowledged == true){
            res.status(201).json({ success: true, message: 'Data inserted' })
        }else{
            res.json({ success: false, message: 'User not found' })
        }
    }
});


/*MODIFICA IMPEGNO*/
router.put('/modificaImpegno', async function(req,res){
    
    let userEmail = req.body.email;
    let idImpegno = req.body.id;
    let impegnoNew = req.body.impegnoNew;
    let animaleNew = req.body.animaleNew;
    let luogoNew = req.body.luogoNew;
    let dataNew = req.body.dataNew;

    if(impegnoNew == "" || animaleNew == "" || luogoNew == "" || dataNew == ""){
        res.status(400).json({ success: false, message: 'Empty inputs' })
    }else{

        // find the user
	    let user = await User.findOne({
		    email: userEmail
	    }).exec();

        if(!user){
            res.json({ success: false, message: 'User not found' })
        }else{

            user = await User.updateOne( { email: userEmail, "impegni._id": idImpegno }, { $set: { "impegni.$.impegno": impegnoNew } } );
            user = await User.updateOne( { email: userEmail, "impegni._id": idImpegno }, { $set: { "impegni.$.animale": animaleNew } } );
            user = await User.updateOne( { email: userEmail, "impegni._id": idImpegno }, { $set: { "impegni.$.luogo": luogoNew } } );
            user = await User.updateOne( { email: userEmail, "impegni._id": idImpegno }, { $set: { "impegni.$.data": dataNew } } );
    
            //console.log(user);
    
            if(user.acknowledged == true){
                res.status(200).json({ success: true, message: 'Changes applyed' })
            }else{
                res.json({ success: false, message: 'Error. Changes not applayed' })
            }
        }
    }
});


/*DELETE IMPEGNO*/
router.delete('/deleteImpegno', async function(req,res){

    //console.log(req.body.idImpegno);

    // find the user
	let user = await User.findOne({
		email: req.body.email
	}).exec();

    if(!user){
        res.json({ success: false, message: 'Delete failed. User not found.' });
    }else{

        user = await User.updateOne( { email: req.body.email }, { $pull: { "impegni": {_id: req.body.idImpegno} } });

        //console.log(user);

        if(user.acknowledged == true){
            res.status(200).json({ success: true, message: 'Impegno deleted' })
        }else{
            res.json({ success: false, message: 'Delete failed' })
        }
    }
});

module.exports = router;