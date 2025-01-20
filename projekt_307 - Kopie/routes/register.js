var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    console.log("Accessing registration page");
    res.render("register");
});

/* Handle registration */
router.post("/", async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Attempting registration with:", username, email);

    // Basic validation
    if (!username || !email || !password) {
        console.log("Registration failed: All fields are required");
        return res.status(400).send("All fields are required.");
    }

    try {
        // Insert user into the database
        const query = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
        `;
        await req.db_connection.query(query, [username, email, password]);
        console.log("Registration successful");

        // Redirect to login page after successful registration
        res.redirect("/login");
    } catch (err) {
        console.error("Database error:", err);
        console.log("Registration error with code:", err.code);

        // Handle unique constraint error (e.g., duplicate usernames)
        if (err.code === "23505") {
            return res.status(400).send("Username already exists.");
        }

        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
