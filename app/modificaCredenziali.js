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

        // find the user
	    let user = await User.findOne({
		    email: emailOld
	    }).exec();

        if(!user){
            res.json({ success: false, message: 'User not found' })
        }else{
            
            user = await User.updateOne( { email: emailOld }, { password: passwordNew });
            user = await User.updateOne( { email: emailOld }, { email: emailNew });

            if(user.acknowledged == true){
                res.status(200).json({ success: true, message: 'Changes applyed' })
            }else{
                res.json({ success: false, message: 'Error. changes not applayed' })
            }
        }
    }
})

module.exports = router;