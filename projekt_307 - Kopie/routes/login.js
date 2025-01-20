var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    console.log("Accessing login page");
    res.render('login', { title: 'Express' });
});

/* Handle login */
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log("Attempting login with:", email);

    // Validate input
    if (!email || !password) {
        console.log("Login failed: Username and password are required");
        return res.status(400).send("username and password are required.");
    }

    try {
        // Check user credentials
        const users = await req.login.loginUser(req);
        console.log("User login result:", users);

        if (!users) {
            console.log("Login failed: User not authenticated");
            return res.redirect("/login");
        }

        // Redirect to dashboard or homepage on success
        console.log("Login successful, redirecting...");
        res.redirect("/profile");
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
