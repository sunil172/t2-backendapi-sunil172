const request = require('supertest');
const express = require('express');
require('dotenv').config();
const scheduleRouter = require('../routes/scheduleRouter');
const auth = require('../routes/auth');
const userRouter = require('../routes/userRouter');
const participantsRouter = require('../routes/participantsRouter');

const app = express();
app.use(express.json());
app.use('/api/schedule', auth.verifyUser, scheduleRouter);
app.use('/api/users', userRouter);
app.use('/api/participants', auth.verifyUser, participantsRouter);

require('./setup');
describe('Test of User Route', () => {
	let token;
	let participant_id;
	let schedule_id;
	let agenda_id;
	let attendee_id;
	let decision_id;

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

	test('should add new schedule', () => {
		return request(app.use(auth.verifyUser))
			.post('/api/schedule')
			.set('Authorization', token)
			.send({
				meeting_title: 'new meeting',
				meeting_desc: 'new meeting description',
				date: '2020-10-10',
				time: '2:30',
				venue: 'kathmandu'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(201);
				schedule_id = res.body._id;
			});
	});

	test('Should get all schedules', () => {
		return request(app.use(auth.verifyUser)).get('/api/schedule').set('authorization', token).then((res) => {
			console.log(res.body);
			expect(res.statusCode).toBe(200);
		});
	});

	test('Should post particular agenda inside sechule', () => {
		return request(app.use(auth.verifyUser))
			.post(`/api/schedule/${schedule_id}/agenda`)
			.set('authorization', token)
			.send({
				agenda_title: 'new agenda',
				agenda_description: 'new agenda description'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
				agenda_id = res.body;
				return request(app)
					.get(`/api/schedule/${schedule_id}/agenda`)
					.set('authorization', token)
					.then((res) => {
						console.log(res.body);
						expect(res.statusCode).toBe(200);
					});
			});
	});

	test('Should get particular schedule', () => {
		return request(app.use(auth.verifyUser))
			.get(`/api/scheule/${schedule_id}`)
			.set('authorization', token)
			.then((res) => {
				console.log(res.body)
				expect(res.statusCode).toBe(200);
			});
	})

	test('Should update particular schedule', () => {
		return request(app.use(auth.verifyUser))
			.put(`/api/scheule/${schedule_id}`)
			.set('authorization', token)
			.send({
				meeting_title: 'new meeting update'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
			});
	});

	test('Should post particular attendee inside sechule', () => {
		return request(app.use(auth.verifyUser))
			.post(`/api/schedule/${schedule_id}/attendees`)
			.set('authorization', token)
			.send({
				participants: participant_id
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(201);
				agenda_id = res.body;
				return request(app)
					.get(`/api/schedule/${schedule_id}/attendees`)
					.set('authorization', token)
					.then((res) => {
						console.log(res.body);
						expect(res.statusCode).toBe(200);
						attendee_id = res.body;
					});
			});
	});

	test('Should update particular attendee', () => {
		return request(app)
			.put(`/api/scheule/${schedule_id}/attendees/${attendee_id}`)
			.set('authorization', token)
			.send({
				meeting_status: 'present'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
			});
	});

	test('Should delete all attendee', () => {
		return request(app)
			.deletet(`/api/scheule/${schedule_id}/attendees`)
			.set('authorization', token)
			.send({
				meeting_status: 'present'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
			});
	});

	test('Should post particular decision inside schedule', () => {
		return request(app.use(auth.verifyUser))
			.post(`/api/schedule/${schedule_id}/decision`)
			.set('authorization', token)
			.send({
				decision: 'this is decision'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
				agenda_id = res.body;
				return request(app.use(auth.verifyUser))
					.get(`/api/schedule/${schedule_id}/decision`)
					.set('authorization', token)
					.then((res) => {
						console.log(res.body);
						expect(res.statusCode).toBe(200);
						decision_id = res.body;
					});
			});
	});

	test('Should update particular decision', () => {
		return request(app)
			.put(`/api/scheule/${schedule_id}/decision/${decision_id}`)
			.set('authorization', token)
			.send({
				decision: 'decision update'
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
			});
	});

	test('Should delete particular decision', () => {
		return request(app)
			.delete(`/api/scheule/${schedule_id}/decision/${decision_id}`)
			.set('authorization', token)
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
			});
	});

	test('Should delete particular attendee', () => {
		return request(app)
			.delete(`/api/scheule/${schedule_id}/attendees/${attendee_id}`)
			.set('authorization', token)
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
			});
	});

	test('Should delete particular agenda', () => {
		return request(app)
			.delete(`/api/scheule/${schedule_id}/agenda/${agenda_id}`)
			.set('authorization', token)
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toBe(200);
			});
	});

	test('Should delete particular schedule', () => {
		return request(app).delete(`/api/scheule/${schedule_id}`).set('authorization', token).then((res) => {
			console.log(res.body);
			expect(res.statusCode).toBe(200);
		});
	});

	test('Should delete schedules', () => {
		return request(app).delete(`/api/scheule`).set('authorization', token).then((res) => {
			console.log(res.body);
			expect(res.statusCode).toBe(200);
		});
	});
});
