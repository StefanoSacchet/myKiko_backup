const express = require('express');
const router = express.Router();
const User = require('./models/user');// get our mongoose model

router.post('', async function(req,res){

    let userEmail = req.body.email;
    let impegnoNew = req.body.impegnoNew;
    let animaleNew = req.body.animaleNew;
    let luogoNew = req.body.luogoNew;
    let dataNew = req.body.dataNew;

    if(impegnoNew == "" || animaleNew == "" || luogoNew == "" || dataNew == ""){
        res.status(400).json({ success: false, message: 'Empty inputs' })
    }else{

        let user = await User.updateOne( { email: userEmail }, { $push: { "impegni": {impegno: impegnoNew, animale: animaleNew, luogo: luogoNew, data: dataNew} } });

        if(user.acknowledged == true){
            res.status(201).json({ success: true, message: 'Data inserted' })
        }else{
            res.json({ success: false, message: 'User not found' })
        }
    }
});

module.exports = router;