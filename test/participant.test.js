const request = require('supertest');
const express = require('express');
require('dotenv').config();
const participantsRouter = require('../routes/participantsRouter');
const auth = require('../routes/auth');
const userRouter = require('../routes/userRouter');

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/participants', auth.verifyUser, participantsRouter);

require('./setup');
describe('Test of User Route', () => {
	let token;
	let participant_id;
	test('should be able to register a user', () => {
		return request(app)
			.post('/api/users/register')
			.send({
				fullname: 'sunil shrestha',
				designation: 'programmer',
				contact: '9876543210',
				organization: 'software company',
				org_address: 'kathmandu',
				email: 'test@gmail.com',
				password: '12345'
			})
			.then((res) => {
				console.log(res.body);

				return request(app)
					.post('/api/users/login')
					.send({
						email: 'test@gmail.com',
						password: '12345'
					})
					.then((res) => {
						console.log(res.body);
						expect(res.status).toBe(200);
						token = res.body.token;
					});
			});
	});
	test('Should add a new attendee for meeting', () => {
		return request(app)
			.post('/api/participants')
			.set('authorization', token)
			.send({
				fullname: 'sunil shrestha',
				designation: 'programmer',
				contact: '9876543210',
				organization: 'software company',
				org_address: 'kathmandu',
				email: 'efgh@gmail.com'
			})
			.then((res) => {
				console.log(res.body);
				participant_id = res.body._id;
				expect(res.statusCode).toBe(200);
			});
	});

	test('Should get all participants', () => {
		return request(app).get(`/api/participants`).set('authorization', token).then((res) => {
			console.log(res.body);
			expect(res.statusCode).toBe(200);
		});
	});

	test('Should get participant with id', () => {
		return request(app).get(`/api/participants/${participant_id}`).set('authorization', token).then((res) => {
			console.log(res.body);
			expect(res.statusCode).toBe(200);
		});
	});

	test('Should update a specific particiant detail', () => {
		return request(app)
			.put(`/api/participants/${participant_id}`)
			.set('authorization', token)
			.send({
				fullname: 'sunil shrestha',
				designation: 'Java Developer',
				contact: '12347890',
				organization: 'java Nepal',
				org_address: 'kathmandu',
				email: 'shresthaaaaa@gmail.com'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.body.designation).toBe('Java Developer');
			});
	});

		test('Should delete a specific participant', () => {
		return request(app.use(auth.verifyAdmin))
			.delete(`/api/participants/${participant_id}`)
			.set('authorization', admin_token)
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
			});
	});
});



