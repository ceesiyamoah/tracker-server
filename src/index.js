require('./models/User');
require('./models/Tracks');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const MONGO_URI =
	'mongodb+srv://admin:passwordPassword@cluster0.aoc76.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
	console.log('connected');
});
mongoose.connection.on('error', (error) => {
	console.error('error connecting', error);
});

app.get('/', requireAuth, (req, res) => {
	res.send(`your email i ${req.user.email}`);
});

app.listen(3000, () => {
	console.log('watching port 3000');
});
