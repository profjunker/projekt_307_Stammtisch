class Login {
    constructor(table, columns, db_connection) {
        this.table = table;
        this.columns = columns;
        this.emailColumn = columns[0];
        this.passwordColumn = columns[1];
        this.db_connection = db_connection;
    }

    async registerUser(req) {
        const values = this.columns.map((c) => {
            return req.body[c];
        });

        const placeholders = [];
        for (let i = 0; i < this.columns.length; i++) {
            placeholders.push(`$${i + 1}`);
        }

        const result = await this.db_connection.query(
            `INSERT INTO ${this.table} (${this.columns.join(
                ", "
            )}) VALUES (${placeholders.join(", ")}) RETURNING id`,
            values,
        );
        const users = await this.db_connection.query(
            `SELECT * FROM ${this.table} WHERE id = $1`,
            [result.rows[0].id],
        );
        return users.rows;
    }

    async loggedInUser(req) {
        if (!req.session.userid) {
            return false;
        }
        const users = await this.db_connection.query(
            `SELECT * FROM ${this.table} WHERE id = $1`,
            [req.session.userid],
        );
        if (users.rows.length < 1) {
            return false;
        }
        return users.rows[0];
    }

    async loginUser(req) {
        try {
            const email = req.body[this.emailColumn];
            const password = req.body[this.passwordColumn];

            // Log the input values for debugging
            console.log("Attempting login for email:", email);

            // Query the database for the user
            const users = await this.db_connection.query(
                `SELECT * FROM ${this.table} WHERE ${this.emailColumn} = $1`,
                [email],
            );

            if (users.rows.length < 1) {
                console.error("Login failed: user not found");
                return false; // User not found
            }

            const user = users.rows[0];
            console.log("User retrieved from database:", users);

            // Compare plain passwords
            if (password === users[this.passwordColumn]) {
                req.session.userid = users.id.toString();
                console.log("Login successful for user:", users.id);
                return users; // Successful login
            }

            console.error("Login failed: password mismatch");
            return false; // Password mismatch
        } catch (err) {
            console.error("Error in loginUser:", err);
            throw err; // Re-throw the error for higher-level handling
        }
    }
}
module.exports = Login;