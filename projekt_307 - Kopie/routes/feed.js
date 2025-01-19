var express = require('express');
var router = express.Router();

router.get('/feed', function(req, res, next) {
    db.query('SELECT * FROM drinks', function(err, results) {
        if (err) {
            return next(err);
        }
        res.render('profile', { drinks: results.rows }); // Render profile page with blog data
    });
});

/* GET home page. */
router.get('/feed', function(req, res, next) {
    res.render('feed', { title: 'Express' });
});

module.exports = router;
