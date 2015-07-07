var express = require('express');
var router = express.Router();
var Event = require('../models/event.js')
var Comment = require('../models/comment.js')
var Post = require('../models/post.js')

/*
 * The API Routes page
 * Defines the routes for the API methods.
 * 
 * 
 */

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
        timestamp: new Date().getTime(),
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

/* POST an attendee to an event */
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

/* GET post listing. */
router.get('/posts', function (req, res) {
    Post.find({}).sort({ timestamp: -1 }).exec(function (err, posts) {
        if (err)
            res.send(err);
        //messages now shown from newest to oldest
        res.json(posts);
    });
});

/* POST post*/
router.post('/posts', function (req, res) {
    console.log(req.body);
    if (!req.body.name) return;
    Post.create({
        timestamp: new Date().getTime(),
        last_updated: new Date().getTime(),
        name: req.body.name,
        desc: req.body.desc
    }, function (err, messages) {
        Post.find({}).sort({ timestamp: -1 }).exec(function (err, posts) {
            if (err)
                res.send(err);
            //messages now shown from newest to oldest
            res.json(posts);
        });
    });
});

module.exports = router;