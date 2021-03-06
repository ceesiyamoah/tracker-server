const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).send({ error: 'Not logged in' });
	}
	const token = authorization.replace('Bearer ', '');
	user = jwt.verify(
		token,
		'The secret youd want to know',
		async (error, payload) => {
			if (error) return res.status(401).send({ error: 'Not logged in' });
			const { userId } = payload;
			const user = await User.findById(userId);
			req.user = user;
			next();
		}
	);
};
