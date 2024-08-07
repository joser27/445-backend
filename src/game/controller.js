const pool = require('../../db');
const queries = require('./queries');

const setup = (req, res) => {
    pool.query(queries.sqlScript, (error, results) => {
        if (error) {
            console.error('Error setting up database:', error);
            res.status(500).send('Database setup failed');
        } else {
            res.status(200).send('Database setup completed successfully');
        }
    });
};

const getAchievements = (req, res) => {
    pool.query('SELECT * FROM Achievement', (error, results) => {
        if (error) {
            console.error('Error retrieving achievements:', error);
            res.status(500).send('Failed to retrieve achievements');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getDeveloperProfile = (req, res) => {
    pool.query('SELECT * FROM Developer_Profile', (error, results) => {
        if (error) {
            console.error('Error retrieving developer profiles:', error);
            res.status(500).send('Failed to retrieve developer profiles');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getGames = (req, res) => {
    pool.query(queries.getGames, (error, results) => {
        if (error) {
            console.error('Error retrieving games:', error);
            res.status(500).send('Failed to retrieve games');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getPurchases = (req, res) => {
    pool.query('SELECT * FROM Purchase', (error, results) => {
        if (error) {
            console.error('Error retrieving purchases:', error);
            res.status(500).send('Failed to retrieve purchases');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getReviews = (req, res) => {
    pool.query('SELECT * FROM Review', (error, results) => {
        if (error) {
            console.error('Error retrieving reviews:', error);
            res.status(500).send('Failed to retrieve reviews');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getUserActivity = (req, res) => {
    pool.query('SELECT * FROM User_Activity', (error, results) => {
        if (error) {
            console.error('Error retrieving user activity:', error);
            res.status(500).send('Failed to retrieve user activity');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getFriends = (req, res) => {
    pool.query('SELECT * FROM Friend', (error, results) => {
        if (error) {
            console.error('Error retrieving friends:', error);
            res.status(500).send('Failed to retrieve friends');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getWishlist = (req, res) => {
    pool.query('SELECT * FROM Wishlist', (error, results) => {
        if (error) {
            console.error('Error retrieving wishlist:', error);
            res.status(500).send('Failed to retrieve wishlist');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getUsers = (req, res) => {
    pool.query('SELECT * FROM User_Profile', (error, results) => {
        if (error) {
            console.error('Error retrieving users:', error);
            res.status(500).send('Failed to retrieve users');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

module.exports = {
    setup,
    getAchievements,
    getDeveloperProfile,
    getGames,
    getPurchases,
    getReviews,
    getUserActivity,
    getFriends,
    getWishlist,
    getUsers
};