var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/', function(req, res, next) {
    console.log('GET /search aufgerufen');
    res.render('search', { title: 'Cocktail Suche' });
});

// API-Route, um Cocktail-Daten im JSON-Format bereitzustellen
router.get('/api', async (req, res, next) => {
    try {
        console.log('API /search/api aufgerufen');
        // Prüfen, ob die Datenbankverbindung verfügbar ist
        if (!req.db_connection) {
            console.error('Datenbankverbindung nicht verfügbar');
            return res.status(500).json({ error: "Datenbankverbindung nicht verfügbar" });
        }
        // Datenbankabfrage
        const result = await req.db_connection.query("SELECT titel, image_path FROM drinks");
        if (!result || result.rows.length === 0) {
            console.log("Keine Cocktails gefunden.");
            return res.json({ cocktails: [] });
        }
        console.log("Cocktails erfolgreich geladen:", result.rows);
        res.json({ cocktails: result.rows });
    } catch (err) {
        console.error("Fehler beim Abrufen der Cocktails:", err.message);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});

module.exports = router;
