var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/', function(req, res, next) {
    res.render('search', { title: 'Express' });
});

module.exports = router;


// Dummy-Daten für Cocktails (später durch eine Datenbank ersetzen)
const cocktails = [
    { name: 'Mojito', image: '/images/mojito.jpg', description: 'Ein klassischer Rum-Cocktail' },
    { name: 'Margarita', image: '/images/margarita.jpg', description: 'Tequila mit Limette' },
    { name: 'Old Fashioned', image: '/images/old-fashioned.jpg', description: 'Ein traditioneller Whiskey-Drink' }
];

// Render die Search-Seite
router.get('/', function(req, res, next) {
    console.log('GET /search aufgerufen');
    res.render('search', { title: 'Cocktail Suche' });
});

// API-Route, um Cocktail-Daten im JSON-Format bereitzustellen
router.get('/api', function(req, res) {
    console.log('GET /search/api aufgerufen');
    res.json({ cocktails });
});

