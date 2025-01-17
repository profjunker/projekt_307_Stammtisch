var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/search', function(req, res, next) {
    res.render('search', { title: 'Express' });
});

module.exports = router;
