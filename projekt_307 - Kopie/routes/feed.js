var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/feed', function(req, res, next) {
    res.render('feed', { title: 'Express' });
});

module.exports = router;
