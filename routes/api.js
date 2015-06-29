var express = require('express');
var router = express.Router();
var Event = require('../models/event.js')
var Comment = require('../models/comment.js')

/* GET events listing. */
router.get('/events', function (req, res) {
    Event.find({}).sort({ timestamp: -1 }).exec(function (err, events) {
        if (err)
            res.send(err);
        //messages now shown from newest to oldest
        res.json(events);
    });
});

/* POST event listing. */
router.post('/events', function (req, res) {
    
    if (!req.body.name) return;
    Event.create({
        timestamp: new Timestamp(),
        name: req.body.name,
        desc: req.body.desc,
        time_from: req.body.time_from,
        time_to: req.body.time_to,
        location: req.body.location,
        category: req.body.category,
        author: req.body.author,
        guest_list: [req.body.author]
    });

    Event.find({}).sort({ timestamp: -1 }).exec(function (err, events) {
        if (err)
            res.send(err);
        //messages now shown from newest to oldest
        res.json(events);
    });
});

/* Attend an event */
router.post('/attend', function (req, res) {
    if (!req.body.guest_name) return;
    Event.findByIdAndUpdate(req.body.event_id, { $push: { guest_list: req.body.guest_name } }, function (err, events) {
        if (err) return handleError(err);
        res.send(events);
    });
});

/* GET comments listing. */
router.get('/comments', function (req, res) {
    Comment.find({}).sort({ timestamp: -1 }).exec(function (err, comments) {
        if (err)
            res.send(err);
        //messages now shown from newest to oldest
        res.json(comments);
    });
});

/* POST comment*/
router.post('/events', function (req, res) {
    if (!req.body.name) return;
    Comment.create({
        timestamp: new Timestamp(),
        event: req.body.event_id,
        text: string
    });

    Comment.find({}).sort({ timestamp: -1 }).exec(function (err, events) {
        if (err)
            res.send(err);
        //messages now shown from newest to oldest
        res.json(events);
    });
});


module.exports = router;