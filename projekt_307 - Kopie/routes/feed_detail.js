var express = require('express');
var router = express.Router();

router.get('/:drinksId', async (req, res, next) => {
    try {
        const drinks = await req.db_connection.query("SELECT * FROM drinks WHERE id = $1", [req.params.drinksId]);
        if (drinks.rows.length > 0) {
            res.render("feed_detail", { drinks: drinks.rows[0] });
        } else {
            res.status(404).render("error", { message: "Blog not found" });
        }
    } catch (err) {
        console.error("Error fetching blog detail:", err);
        res.status(500).render("error", { message: "Internal Server Error" });
    }
});
module.exports = router;