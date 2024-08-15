const { Pool } = require('pg');

// Connect to the default postgres database
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "test",
    port: 5432,
});

const dbName = 'arcade_db';

const deleteDatabase = async () => {
    try {
        const client = await pool.connect();
        await client.query(`DROP DATABASE IF EXISTS ${dbName}`);
        console.log(`Database ${dbName} deleted successfully.`);
        client.release();
    } catch (err) {
        console.error(`Error deleting database: ${err}`);
    } finally {
        pool.end();
    }
};

deleteDatabase();
