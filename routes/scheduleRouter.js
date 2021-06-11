const express = require('express');
const router = express.Router();

const Schedule = require('../models/Schedule');
const auth = require('./auth');
const User = require('../models/User');

router
	.route('/')
	.get((req, res, next) => {
		Schedule.find()
			.then((schedules) => {
				res.json(schedules);
			})
			.catch(next);
	})
	.post((req, res, next) => {
		Schedule.create(req.body)
			.then((schedule) => {
				res.status(201).json(schedule);
			})
			.catch(next);
	})
	.delete(auth.verfiyAdmin, (req, res, next) => {
		Schedule.deleteMany()
			.then((reply) => {
				res.json(reply);
			})
			.catch(next);
	});

router
	.route('/:schedule_id')
	.get((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				res.json(schedule);
			})
			.catch(next);
	})
	.put((req, res, next) => {
		Schedule.findByIdAndUpdate(req.params.schedule_id, { $set: req.body }, { new: true })
			.then((updatedSchedule) => {
				res.json(updatedSchedule);
			})
			.catch(next);
	})
	.delete(auth.verfiyAdmin, (req, res, next) => {
		Schedule.findByIdAndDelete(req.params.schedule_id)
			.then((reply) => {
				res.json(reply);
			})
			.catch(next);
	});

router
	.route('/:schedule_id/attendees')
	.get((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.populate({ path: 'attendees.participants', models: 'User' })
			.then((schedule) => {
				res.json(schedule.attendees);
			})
			.catch(next);
	})
	.post((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((Schedule) => {
				Schedule.attendees.push(req.body);
				Schedule.save()
					.then((updatedSchedule) => {
						res.status(201).json(updatedSchedule.attendees);
					})
					.catch(next);
			})
			.catch(next);
	})
	.delete((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((Schedule) => {
				Schedule.attendees = [];
				Schedule.save()
					.then((updatedSchedule) => {
						res.json(updatedSchedule.attendees);
					})
					.catch(next);
			})
			.catch(next);
	});

router
	.route('/:schedule_id/attendees/:attendee_id')
	.get((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.populate('User')
			.then((Schedule) => {
				res.json(Schedule.attendees.id(req.params.attendee_id));
			})
			.catch(next);
	})
	.put((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				if (schedule.attendees.id(req.params.attendee_id)) {
					let at = schedule.attendees.id(req.params.attendee_id);
					console.log(at);
					at.present_status = req.body.present_status;
					schedule
						.save()
						.then((updatedSchedule) => {
							res.json(updatedSchedule.attendees);
						})
						.catch(next);
				}
			})
			.catch(next);

		// Schedule.findById(req.params.schedule_id)
		// 	.then((Schedule) => {
		// 		if (Schedule.attendees.includes(req.params.attendee_id)) {
		// 			attendees
		// 				.findByIdAndUpdate(
		// 					req.params.attendee_id,
		// 					{
		// 						$set: req.body
		// 					},
		// 					{
		// 						new: true
		// 					}
		// 				)
		// 				.then((attendees) => {
		// 					res.json(attendees);
		// 				})
		// 				.catch(next);
		// 		} else {
		// 			throw new Error('Not found!');
		// 		}
		// 	})
		// 	.catch(next);
	})
	.delete(auth.verfiyAdmin, (req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				if (schedule.attendees.id(req.params.attendee_id)) {
					console.log(schedule.attendees.id(req.params.attendee_id));
					schedule.attendees = schedule.attendees.filter((attendee) => {
						return attendee.id != req.params.attendee_id;
					});
					schedule
						.save()
						.then((updatedSchedule) => {
							res.json(updatedSchedule.agendas);
						})
						.catch(next);
				}
			})
			.catch(next);
	});

router
	.route('/:schedule_id/agenda')
	.get((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				res.json(schedule.agenda);
			})
			.catch(next);
	})
	.post((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				schedule.agenda.push(req.body);
				schedule
					.save()
					.then((updatedSchedule) => {
						res.json(updatedSchedule.agenda);
					})
					.catch(next);
			})
			.catch(next);
	})
	.delete(auth.verfiyAdmin, (req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				schedule.agendas = [];
				schedule
					.save()
					.then((updatedSchedule) => {
						res.json(updatedSchedule.agendas);
					})
					.catch(next);
			})
			.catch(next);
	});

router
	.route('/:schedule_id/agenda/:agenda_id')
	.get((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				res.json(schedule.agenda.id(req.params.agenda_id));
			})
			.catch(next);
	})
	.put((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				let agenda = schedule.agenda.id(req.params.agenda_id);
				console.log(agenda);
				agenda.agenda_title = req.body.agenda_title;
				agenda.agenda_description = req.body.agenda_description;
				console.log(agenda);
				schedule
					.save()
					.then((updatedSchedule) => {
						res.json(schedule.agenda.id(req.params.agenda_id));
					})
					.catch(next);
			})
			.catch(next);
	})
	.delete(auth.verfiyAdmin, (req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				schedule.agenda = schedule.agenda.filter((agenda) => {
					return agenda.id != req.params.agenda_id;
				});

				schedule
					.save()
					.then((updatedSchedule) => {
						res.json(schedule.agenda);
					})
					.catch(next);
			})
			.catch(next);
	});

router
	.route('/:schedule_id/decision')
	.get((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				res.json(schedule.decision);
			})
			.catch(next);
	})
	.post((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				schedule.decision.push(req.body);
				schedule
					.save()
					.then((updatedSchedule) => {
						res.json(updatedSchedule.decision);
					})
					.catch(next);
			})
			.catch(next);
	})
	.delete(auth.verfiyAdmin, (req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				schedule.decision = [];
				schedule
					.save()
					.then((updatedSchedule) => {
						res.json(updatedSchedule.decision);
					})
					.catch(next);
			})
			.catch(next);
	});

router
	.route('/:schedule_id/decision/:decision_id')
	.get((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				res.json(schedule.decision.id(req.params.decision_id));
			})
			.catch(next);
	})
	.put((req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				let dec = schedule.decision.id(req.params.decision_id);
				dec.decision = req.body.decision;
				schedule
					.save()
					.then((updatedSchedule) => {
						res.json(schedule.decision.id(req.params.decision_id));
					})
					.catch(next);
			})
			.catch(next);
	})
	.delete(auth.verfiyAdmin, (req, res, next) => {
		Schedule.findById(req.params.schedule_id)
			.then((schedule) => {
				schedule.decision = schedule.decision.filter((decision) => {
					return decision.id != req.params.decision_id;
				});
				schedule
					.save()
					.then((updatedSchedule) => {
						res.json(schedule.decision);
					})
					.catch(next);
			})
			.catch(next);
	});

module.exports = router;
