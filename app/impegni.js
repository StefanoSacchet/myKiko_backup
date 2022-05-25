const express = require('express');
const router = express.Router();
const User = require('./models/user');// get our mongoose model

router.get('', async function(req,res){

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
})

module.exports = router;