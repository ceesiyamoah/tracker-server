const express = require('express');

const router = express.Router();

router.post('/signup', (res, req) => {
	console.log(res.body);
	req.send('welcome big man');
	console.log('trying to sign up ');
});

router.post('/signin', (res, req) => {
	req.send('signing in I see');
	console.log('trying to sign in');
});

module.exports = router;
