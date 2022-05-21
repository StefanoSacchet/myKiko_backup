const express = require('express');
const router = express.Router();
const User = require('./models/user');// get our mongoose model

router.put('', async function(req,res){
    
    //console.log(req.body.emailNew);

    let emailOld = req.body.emailOld;
    let emailNew = req.body.emailNew;
    let passwordNew = req.body.passwordNew;

    if(emailNew == "" || passwordNew == ""){ //Check if some input is empty
        res.status(400).json({ success: false, message: 'Empty inputs' })
    }else{

        let user = await User.updateOne( { email: emailOld }, { password: passwordNew });
        user = await User.updateOne( { email: emailOld }, { email: emailNew });

        if(user.acknowledged == true){
            res.status(200).json({ success: true, message: 'Changes applyed' })
        }else{
            res.json({ success: false, message: 'User not found' })
        }
    }
})

module.exports = router;