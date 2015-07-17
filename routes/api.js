var express = require('express');
var router = express.Router();
var http = require('http');
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
    if (!req.query.id) res.send("No comments found!?");
    else Comment.find({ 'postId': req.query.id }).sort({ timestamp: 1 }).exec(function (err, comments) {
        if (err)
            res.send(err);
        //messages now shown from newest to oldest
        res.json(comments);
    });
});

/* POST comment*/
router.post('/comments', function (req, res) {
    if (!req.body.text) return;
    if (!req.body.postId) return;
    
    var options = {
        host: 'www.wdyl.com',
        path: '/profanity?q=' + encodeURIComponent(req.body.text)
    };

    function postComment() {
        Comment.create({
            timestamp: new Date().getTime(),
            postId: req.body.postId,
            text: req.body.text,
        }, function (err) {
            Comment.find({ 'postId': req.body.postId }).sort({ timestamp: 1 }).exec(function (err, comments) {
                if (err)
                    res.send(err);
                //messages now shown from newest to oldest
                res.json(comments);
            });
        });
    }

    profanityResponse = function (response) {
        var str = '';
        
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });
        
        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            var isProfane = JSON.parse(str).response == "true";
            if (isProfane) {
                res.send(403, "YOU HAVE BEEN TERMINATED");
            }
            else {
                postComment();
            }
        });
    }

    
    http.request(options, profanityResponse).end();
});

/* GET post listing. */
router.get('/posts', function (req, res) {
    Post.find({}).sort({ timestamp: -1 }).exec(function (err, posts) {
        if (err)
            res.send(err);
        res.json(posts);
    });
});

// POST post helper methods

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
    host: 'www.wdyl.com',
    path: '/profanity?q=hello+hi'
};

callback = function (response) {
    var str = '';
    
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });
    
    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
        var isProfane = JSON.parse(str).response;
        console.log(isProfane);
    });
}

/* POST post*/
router.post('/posts', function (req, res) {
    console.log(req.body);
    if (!req.body.name) res.send(403, "YOU HAVE BEEN TERMINATED");
    var author = req.body.author;
    if (!author) {
        author = "Anonymous";
    }
    
    var options = {
        host: 'www.wdyl.com',
        path: '/profanity?q=' + encodeURIComponent(req.body.name) + "+" + encodeURIComponent(req.body.desc) + "+" + encodeURIComponent(req.body.author)
    };
    
    function postToMongoose() {
        Post.create({
            timestamp: new Date().getTime(),
            last_updated: new Date().getTime(),
            name: req.body.name,
            desc: req.body.desc,
            imageURL: req.body.imageURL,
            category: parseInt(req.body.category),
            author: author,
            password: req.body.password
        }, function (err) {
            Post.find({}).sort({ timestamp: -1 }).exec(function (err, posts) {
                if (err)
                    res.send(err);
                else
                //messages now shown from newest to oldest
                res.json(posts);
            });
        });
    }

    profanityResponse = function (response) {
        var str = '';
        
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });
        
        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            var isProfane = JSON.parse(str).response == "true";
            if (isProfane) {
                res.send(403, "YOU HAVE BEEN TERMINATED");
            }
            else {
                postToMongoose();
            }
        });
    }

    http.request(options, profanityResponse).end();
});

router.delete('/posts', function (req, res) {
    Post.findById(req.query.id).exec(function (err, post) {
        if (req.query.password == "NuclearRice666" || req.query.password == post.password) {
            Post.findByIdAndRemove(req.query.id).exec(function (err, post) {
                if (err)
                    res.send(err);
                else
                Post.find({}).sort({ timestamp: -1 }).exec(function (err, posts) {
                    if (err)
                        res.send(err);
                    else res.json(posts);
                });
            });
        } else {
            Post.find({}).sort({ timestamp: -1 }).exec(function (err, posts) {
                if (err)
                    res.send(err);
                else res.json(posts);
            });
        }
    })
});

module.exports = router;