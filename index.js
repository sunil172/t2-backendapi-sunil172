const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const auth = require('./routes/auth');
const scheduleRouter = require('./routes/scheduleRouter');
const minuteRouter = require('./routes/minuteRouter');
const participantsRouter = require('./routes/participantsRouter');

mongoose
	.connect(process.env.DbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
		useCreateIndex: true
	})
	.then((db) => console.log('Database Server Connected'))
	.catch((err) => console.log(err));

const app = express();
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.send('Welcome to my App');
});

app.use('/api/users', userRouter);
app.use('/api/schedule', auth.verifyUser, scheduleRouter);
app.use('/api/participants', auth.verifyUser, participantsRouter);

app.use((req, res, next) => {
	let err = new Error('Not Found!');
	err.status = 404;
	next(err);
});

app.use((err, req, res) => {
	console.log(err.stack);
	res.status(err.status || 500);
	return res.json({
		status: 'error',
		message: err.message
	});
});

app.listen(process.env.Port, () => {
	console.log('Server is running at ' + process.env.Port);
});
