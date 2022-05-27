const express = require('express');
const router = express.Router();
const User = require('./models/user'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ---------------------------------------------------------
// route to authenticate and get a new token
// ---------------------------------------------------------
router.post('/authentication', async function(req, res) {

	if(req.body.email == "" || req.body.password == ""){
		res.status(400).json({ success: false, message: 'Empty inputs' })
	}else{

		// find the user
		let user = await User.findOne({
			email: req.body.email
		}).exec();

		// user not found
		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		}else{

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			}else{

				// if user is found and password is right create a token
				var payload = {
					email: user.email,
					id: user._id
					// other data encrypted in the token	
				}
				var options = {
					expiresIn: 86400 // expires in 24 hours
				}
				var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

				res.status(200).json({
					success: true,
					message: 'Enjoy your token!',
					token: token,
					email: user.email,
					id: user._id,
					self: "api/v1/" + user._id,
				});
			}
		}
	}
});


/*REGISTRATION*/
router.post('/registration', async function(req, res){

    //Check if username or password are empty
    if(req.body.email == "" || req.body.password == ""){
        res.status(400).json({ success: false, message: 'Registration failed. input empty'})
    }else{

        // Search the user
        let user = await User.findOne({
            email: req.body.email
        }).exec();

        //User found
        if(user){
            res.json({ success: false, message: 'Registration failed. User already subscribed.' });
        }else{

            new User({
                email: req.body.email,
                password: req.body.password
            }).save();

            //Check subscription
            user = User.findOne({
                email: req.body.email
            }).exec();

            if(user){
                res.status(201).json({
                    success: true,
                    message: 'User subscribed',
                    email: user.email,
                    id: user._id,
                    self: "api/v1/" + user._id
                });
            }else{
                res.json({success: false, message: 'Registration failed.'})
            } 
        }
    }
});


/*MODIFICA CREDENZIALI*/
router.put('/modificaCredenziali', async function(req,res){
    
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
});


/*DELETE ACCOUNT*/
router.delete('/deleteAccount', async function(req, res){

    // find the user
	let user = await User.findOne({
		email: req.body.email
	}).exec();

    if(!user){
        res.json({ success: false, message: 'Delete failed. User not found.' });
    }else{

        user = await User.deleteOne( { email: req.body.email });

        if(user.acknowledged == true){
            res.status(200).json({ success: true, message: 'Account deleted' })
        }else{
            res.json({ success: false, message: 'Delete failed' })
        }
    }
});

module.exports = router;