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

		res.send({ token });
	} catch (error) {
		return res.status(422).send(error.message);
	}
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		res.status(422).send({ error: 'Invalid email or password' });

	const user = await User.findOne({ email });
	try {
		await user.comparePassword(user.password);
		const token = jwt.sign(
			{ userId: user._id },
			'The secret youd want to know'
		);
		res.send({ token });
	} catch (error) {
		res.status(422).send({ error: 'Invalid email or password' });
	}
});

module.exports = router;
