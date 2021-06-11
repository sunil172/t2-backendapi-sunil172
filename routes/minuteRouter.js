const express = require('express');
const router = express.Router();

const Minute = require('../models/Minute');
const auth = require('./auth');

router.route('/')
.get((req, res, next) => {
    Minute.find()
    .then((minutes) => {
        res.json(minutes);
    }).catch(next);
})
.post ((req, res, next) => {
    Minute.create(req.body)
    .then((minute) => {
        res.status(201).json(minute);
    }).catch(next);
})
.delete(auth.verfiyAdmin, (req, res, next) => {
    Minute.deleteMany()
    .then((reply) => {
        res.json(reply);
    }).catch(next);
});

router.route('/:minute_id')
.get((req, res, next) => {
    Minute.findById(req.params.minute_id)
    .then((minute) => {
        res.json(minute);
    }).catch(next);
})
.put ((req, res, next) => {
    Minute.findByIdAndUpdate(req.params.minute_id, {$set: req.body}, {new: true})
    .then(updatedMinute => {
        res.json(updatedMinute);
    }).catch(next);
})
.delete(auth.verfiyAdmin, (req, res, next) => {
    Minute.findByIdAndDelete(req.params.minute_id)
    .then((reply) => {
        res.json(reply);
    }).catch(next);
});

module.exports = router; 