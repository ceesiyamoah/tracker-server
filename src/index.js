const express = require('express');
const mongoose = require('mongoose');

const app = express();

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

app.get('/', (req, res) => {
	res.send('hello man ');
});

app.listen(3000, () => {
	console.log('watching port 3000');
});
