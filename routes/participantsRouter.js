const express = require('express');
const User = require('../models/User');
const router = express.Router();
const auth = require('./auth');

router
	.route('/')
	.get((req, res, next) => {
		User.find()
			.then((users) => {
				res.json(users);
			})
			.catch(next);
	})
	.post((req, res, next) => {
		let { fullname, designation, contact, organization, org_address, email } = req.body;
		User.findOne({ email })
			.then((user) => {
				if (user) {
					return res.status(401).json({
						status: 'error',
						message: 'user already exist'
					});
				} else {
					User.create({ fullname, designation, contact, organization, org_address, email })
						.then((user) => {
							res.json(user);
						})
						.catch(next);
				}
			})
			.catch(next);
	});
router
	.route('/:userId')
	.get((req, res, next) => {
		User.findById(req.params.userId)
			.then((user) => {
				res.json(user);
			})
			.catch(next);
	})
	.put((req, res, next) => {
		User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true })
			.then((updateUser) => {
				res.json(updateUser);
			})
			.catch(next);
	})
	.delete(auth.verfiyAdmin, (req, res, next) => {
		User.findByIdAndDelete(req.params.userId)
			.then((reply) => {
				res.json(reply);
			})
			.catch(next);
	});

module.exports = router;
