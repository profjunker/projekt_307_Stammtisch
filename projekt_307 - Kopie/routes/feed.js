var express = require('express');
var router = express.Router();

router.get("/feed", async (req, res) => {
    try {
        // Abfrage der neuesten Blogposts sortiert nach created_at
        const drinks = await req.pool.query(
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
});

/* GET home page. */
router.get('/feed', function(req, res, next) {
    res.render('feed', { title: 'Express' });
});

module.exports = router;
