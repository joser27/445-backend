const { Pool } = require('pg');

// Connect to the default postgres database
const defaultPool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",  // default database
    password: "test",
    port: 5432,
});

const dbName = 'arcade_db';

// Function to create the database if it doesn't exist
async function createDatabase() {
    try {
        const client = await defaultPool.connect();
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log(`Database ${dbName} created.`);
        } else {
            console.log(`Database ${dbName} already exists.`);
        }
        client.release();
    } catch (err) {
        console.error(`Error creating database: ${err}`);
    } finally {
        defaultPool.end();
    }
}

// Function to create the tables in the new database
async function createTables() {
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: dbName,
        password: "test",
        port: 5432,
    });

    const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS User_Profile (
        user_id SERIAL PRIMARY KEY,
        login_credentials VARCHAR(255) NOT NULL,
        payment_info VARCHAR(255),
        game_library TEXT,
        friend_list TEXT,
        status VARCHAR(50),
        age INT
    );

    CREATE TABLE IF NOT EXISTS Game_Information (
        game_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        dev_id INT NOT NULL,
        genre VARCHAR(100),
        price DECIMAL(10, 2),
        release_info DATE,
        rating DECIMAL(2, 1),
        age_restrictions INT
    );

    CREATE TABLE IF NOT EXISTS Developer_Profile (
        dev_id SERIAL PRIMARY KEY,
        dev_name VARCHAR(255) NOT NULL,
        dev_info TEXT,
        date_joined DATE
    );

    CREATE TABLE IF NOT EXISTS Wishlist (
        wish_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        game_id INT NOT NULL,
        date_added DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User_Profile(user_id) ON DELETE CASCADE,
        FOREIGN KEY (game_id) REFERENCES Game_Information(game_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Purchase (
        user_id INT NOT NULL,
        game_id INT NOT NULL,
        purchase_date DATE NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (user_id, game_id, purchase_date),
        FOREIGN KEY (user_id) REFERENCES User_Profile(user_id) ON DELETE CASCADE,
        FOREIGN KEY (game_id) REFERENCES Game_Information(game_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Review (
        rev_id SERIAL PRIMARY KEY,
        game_id INT NOT NULL,
        user_id INT NOT NULL,
        rev_rating DECIMAL(2, 1) NOT NULL CHECK (rev_rating >= 0 AND rev_rating <= 10),
        rev_text TEXT,
        rev_date DATE NOT NULL,
        FOREIGN KEY (game_id) REFERENCES Game_Information(game_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES User_Profile(user_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS User_Activity (
        user_id INT NOT NULL,
        game_id INT NOT NULL,
        time_played INT NOT NULL,
        last_played DATE NOT NULL,
        PRIMARY KEY (user_id, game_id),
        FOREIGN KEY (user_id) REFERENCES User_Profile(user_id) ON DELETE CASCADE,
        FOREIGN KEY (game_id) REFERENCES Game_Information(game_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Friend (
        user_id INT NOT NULL,
        friend_id INT NOT NULL,
        date_added DATE NOT NULL,
        status VARCHAR(50) NOT NULL,
        PRIMARY KEY (user_id, friend_id),
        FOREIGN KEY (user_id) REFERENCES User_Profile(user_id) ON DELETE CASCADE,
        FOREIGN KEY (friend_id) REFERENCES User_Profile(user_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Achievement (
        achv_id SERIAL PRIMARY KEY,
        game_id INT NOT NULL,
        achv_name VARCHAR(255) NOT NULL,
        achv_desc TEXT,
        FOREIGN KEY (game_id) REFERENCES Game_Information(game_id) ON DELETE CASCADE
    );
    `;

    

    try {
        await pool.query(createTablesQuery);
        console.log("All tables created successfully!");
    } catch (err) {
        console.error("Error creating tables:", err);
    } finally {
        pool.end();
    }
}

// Execute the functions sequentially
createDatabase().then(() => createTables());
