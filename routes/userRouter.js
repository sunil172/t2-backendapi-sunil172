const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validation = require('../validation');

router.post('/register', (req, res, next) => {
	const { errors, isValid } = validation.registerInput(req.body);
	if (!isValid) {
		return res.status(401).json({
			status: 'error',
			message: errors
		});
	}
	let { fullname, designation, contact, organization, org_address, email, password } = req.body;
	User.findOne({ email })
		.then((user) => {
			if (user) {
				return res.status(401).json({
					status: 'error',
					message: 'user already exist'
				});
			} else if (password != null) {
				bcrypt.hash(password, 10, (err, hash) => {
					if (err) return next(err);
					User.create({ fullname, designation, contact, organization, org_address, email, password: hash })
						.then((user) => {
							res.json(user);
						})
						.catch(next);
				});
			}
		})
		.catch(next);
});

router.post('/login', (req, res, next) => {
	let { email, password } = req.body;
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({
					status: 'error',
					message: 'user not found!'
				});
			} else if (password == null) {
				return res.status(401).json({
					status: 'error',
					message: 'Guest are not allowed to login !!!'
				});
			}
			bcrypt
				.compare(password, user.password)
				.then((isMatched) => {
					if (!isMatched) {
						return res.status(401).json({
							status: 'error',
							message: 'Password does not matched!!'
						});
					}
					let payload = {
						id: user.id,
						email: user.email,
						firstName: user.firstName,
						lastName: user.lastName,
						role: user.role
					};
					jwt.sign(payload, process.env.SECRET, (err, token) => {
						if (err) {
							return next(err);
						}
						res.json({
							status: 'Login Successful',
							token: `Bearer ${token}`,
							user: user.id
						});
					});
				})
				.catch(next);
		})
		.catch(next);
});

module.exports = router;
