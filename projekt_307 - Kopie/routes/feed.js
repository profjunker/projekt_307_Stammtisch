var express = require('express');
var router = express.Router();

router.get("/", async (req, res, next) => {

    try {
        // Abfrage der neuesten Blogposts sortiert nach created_at
        const drinks = await req.db_connection.query(
            "SELECT * FROM drinks"
        );

        // Optional: Logge die Ergebnisse für Debugging
        console.log("Drinks fetched for index page:", drinks.rows);

        // Übergabe der Blogposts an die View
        res.render("feed", { drinks: drinks.rows });
    } catch (err) {
        console.error("Error fetching blogs for index page:", err);
        res.status(500).render("error", { message: "Internal Server Error" });
    }
/* GET home page. */
});

module.exports = router;

router.get('/', async function(req, res, next) {
    const cocktails = [
        { name: 'Mojito', image: '/images/mojito.jpg', description: 'Ein klassischer Rum-Cocktail' },
        { name: 'Margarita', image: '/images/margarita.jpg', description: 'Tequila mit Limette' },
        { name: 'Old Fashioned', image: '/images/old-fashioned.jpg', description: 'Ein traditioneller Whiskey-Drink' }
    ];
    res.json({ cocktails });
});