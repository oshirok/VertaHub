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
    if (!req.query.postId) res.send("No comments found!?");
    Comment.find({ 'postId': req.query.postId }).sort({ timestamp: -1 }).exec(function (err, comments) {
        if (err)
            res.send(err);
        //messages now shown from newest to oldest
        res.json(comments);
    });
});

/* POST comment*/
router.post('/comments', function (req, res) {
    if (!req.body.name) return;
    Comment.create({
        timestamp: new Date().getTime(),
        postId: req.body.postId,
        text: string
    }, function (err) {
        Comment.find({ 'postId': req.query.postId }).sort({ timestamp: -1 }).exec(function (err, comments) {
            if (err)
                res.send(err);
            //messages now shown from newest to oldest
            res.json(comments);
        });
    });
});

/* GET post listing. */
router.get('/posts', function (req, res) {
    Post.find({}).sort({ timestamp: -1 }).exec(function (err, posts) {
        if (err)
            res.send(err);
        //messages now shown from newest to oldest
        for (var i = 0; i < posts.length; i++) {
            var words = posts[i].author.split(" ");
            var result = "";
            for (var j = 0; j < words.length; j++) {
                result += "Verta" + words[j] + " ";
            }
            posts[i].author = result;
        }
        res.json(posts);
    });
});

/* POST post*/
router.post('/posts', function (req, res) {
    console.log(req.body);
    if (!req.body.name) return;
    var author = req.body.author;
    if (!author) {
        author = "Anonymous";
    }
    Post.create({
        timestamp: new Date().getTime(),
        last_updated: new Date().getTime(),
        name: req.body.name,
        desc: req.body.desc,
        imageURL: req.body.imageURL,
        category: parseInt(req.body.category),
        author: author,
        password: password
    }, function (err) {
        Post.find({}).sort({ timestamp: -1 }).exec(function (err, posts) {
            if (err)
                res.send(err);
            //messages now shown from newest to oldest
            res.json(posts);
        });
    });
});

router.delete('/posts', function (req, res) {
    Post.findById(req.query.id).exec(function (err, post) {
        if (req.query.password == "NuclearRice666" || req.query.password == post.password) {
            Post.findByIdAndRemove(req.query.id).exec(function (err, post) {
                if (err)
                    res.send(err);
                Post.find({}).sort({ timestamp: -1 }).exec(function (err, posts) {
                    if (err)
                        res.send(err);
                    //messages now shown from newest to oldest
                    for (var i = 0; i < posts.length; i++) {
                        var words = posts[i].author.split(" ");
                        var result = "";
                        for (var j = 0; j < words.length; j++) {
                            result += "Verta" + words[j] + " ";
                        }
                        posts[i].author = result;
                    }
                    res.json(posts);
                });
            });
        } else {
            Post.find({}).sort({ timestamp: -1 }).exec(function (err, posts) {
                if (err)
                    res.send(err);
                //messages now shown from newest to oldest
                for (var i = 0; i < posts.length; i++) {
                    var words = posts[i].author.split(" ");
                    var result = "";
                    for (var j = 0; j < words.length; j++) {
                        result += "Verta" + words[j] + " ";
                    }
                    posts[i].author = result;
                }
                res.json(posts);
            });
        }
    })
});

module.exports = router;