const express = require('express');
const router = express.Router();
const User = require('./models/user');// get our mongoose model

router.delete('', async function(req,res){

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