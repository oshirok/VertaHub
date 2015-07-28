var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { location: 'Bothell' });
});

/* GET home page. */
router.get('/all', function (req, res) {
    res.render('index', { location: 'All' });
});

/* GET home page. */
router.get('/bothell', function (req, res) {
    res.render('index', { location: 'Bothell' });
});

/* GET home page. */
router.get('/atlanta', function (req, res) {
    res.render('index', { location: 'Atlanta' });
});

/* GET home page. */
router.get('/boulder', function (req, res) {
    res.render('index', { location: 'Boulder' });
});

/* GET home page. */
router.get('/deerfieldbeach', function (req, res) {
    res.render('index', { location: 'Deerfield Beach' });
});

/* GET home page. */
router.get('/eastlansing', function (req, res) {
    res.render('index', { location: 'East Lansing' });
});

/* GET home page. */
router.get('/eleva', function (req, res) {
    res.render('index', { location: 'Eleva' });
});

/* GET home page. */
router.get('/indianapolis', function (req, res) {
    res.render('index', { location: 'Indianapolis' });
});

/* GET home page. */
router.get('/irving', function (req, res) {
    res.render('index', { location: 'Irving' });
});

/* GET home page. */
router.get('/pulaski', function (req, res) {
    res.render('index', { location: 'Pulaski' });
});

/* GET home page. */
router.get('/tampa', function (req, res) {
    res.render('index', { location: 'Tampa' });
});

/* GET home page. */
router.get('/windsor', function (req, res) {
    res.render('index', { location: 'Windsor' });
});

/* GET home page. */
router.get('/woodlandhills', function (req, res) {
    res.render('index', { location: 'Woodland Hills' });
});

module.exports = router;