const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = new User({ email, password });
		await user.save();
		const token = jwt.sign(
			{ userId: user._id },
			'The secret youd want to know'
		);

		res.send(token);
		console.log('trying to sign up ');
	} catch (error) {
		return res.status(422).send(error.message);
	}
});

router.post('/signin', (req, res) => {
	res.send('signing in I see');
	console.log('trying to sign in');
});

module.exports = router;
