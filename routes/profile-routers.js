const router = require('express').Router();

const authCheck = (req,res,next) => {
	if(!req.user){
		res.redirect('/auth/login');

	} else {
		next();
	}
}

router.get('/', function(req,res){
	res.send('You are log in now' + req.user.username);
});

module.exports = router;