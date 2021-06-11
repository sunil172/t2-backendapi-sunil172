const request = require('supertest');
const express = require('express');
require('dotenv').config();
const userRouter = require('../routes/userRouter');

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);
// Setup
require('./setup');
describe('Test of User Route', () => {
	test('should be able to register a user', () => {
		return request(app)
			.post('/api/users/register')
			.send({
				fullname: 'sunil shrestha',
				designation: 'programmer',
				contact: '9876543210',
				organization: 'software company',
				org_address: 'kathmandu',
				email: 'abcd@gmail.com',
				password: '12345'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
			});
	});

	test('should not register user with same username', () => {
		return request(app)
			.post('/api/users/register')
			.send({
				email: 'abcd@gmail.com',
				password: '12345'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.status).toBe(401);
				expect(res.body.status).toBe('error');
			});
	});

	test('should be able to login', () => {
		return request(app)
			.post('/api/users/login')
			.send({
				email: 'abcd@gmail.com',
				password: '12345'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
				expect(res.body.token).not.toBe('undefined');
			});
	});
});

describe('Validation of User', () => {
	test('should not register user with short username', () => {
		return request(app)
			.post('/api/users/register')
			.send({
				username: 'aau',
				password: 'sususu123'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(401);
				expect(res.body.status).toBe('error');
			});
	});

	test('should not register user with short password', () => {
		return request(app)
			.post('/api/users/register')
			.send({
				email: 'abcd@gmail.com',
				password: '123'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(401);
				expect(res.body.status).toBe('error');
			});
	});

	test('should be not be able to login with wrong password', () => {
		return request(app)
			.post('/api/users/login')
			.send({
				email: 'abcd@gmail.com',
				password: '123dfghj'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(401);
				expect(res.body.status).toBe('error');
			});
	});

	test('should not be able to login with wrong username', () => {
		return request(app)
			.post('/api/users/login')
			.send({
				email: 'sssdfghjklh@gmail.com',
				password: '1234'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(401);
				expect(res.body.status).toBe('error');
			});
	});
});
