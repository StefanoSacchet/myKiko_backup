const express = require('express');
const router = express.Router();
const User = require('./models/user');// get our mongoose model

router.put('', async function(req,res){
    
    //console.log(req.body.emailNew);

    let emailOld = req.body.emailOld;
    let emailNew = req.body.emailNew;
    let passwordNew = req.body.passwordNew;

    if(emailNew == "" || passwordNew == ""){
        res.status(400).json({ success: false, message: 'Empty inputs' })
    }else{

        let user = await User.updateOne( { email: emailOld }, { password: passwordNew })
        user = await User.updateOne( { email: emailOld }, { email: emailNew })

        if(user){
            res.status(200).json({ success: true, message: 'Changes applyed' })
        }else{
            res.status(404).json({ success: false, message: 'Error' })
        }
    }
})

module.exports = router;