var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    let news = [];
    try {
         news = await req.db_connection.query('select * from news');
    }catch (err) {
        console.error("Fehler bei der Datenbankabfrage:", err);
        return next(err); // Leite den Fehler an den Error-Handler weiter
    }
    res.render('news', { news: news.rows });
});

router.get('/:id', function(req, res, next) {
    res.render('news_detail', { title: 'Express' });
});

router.get('/edit/:id', function(req, res, next) {
    res.render('news_edit', { title: 'Express' });
});

module.exports = router;
