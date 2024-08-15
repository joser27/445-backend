const pool = require('../../db');
const queries = require('./queries');



const getMutualFriends = (req, res) => {
    const { username1, username2 } = req.query;

    if (!username1 || !username2) {
        return res.status(400).send('Both usernames are required');
    }

    pool.query(queries.getMutualFriendsQuery, [username1, username2], (error, results) => {
        if (error) {
            console.error('Error retrieving mutual friends:', error);
            res.status(500).send('Failed to retrieve mutual friends');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getTopPurchasedGames = (req, res) => {
    const { minPrice, maxPrice } = req.query;

    if (!minPrice || !maxPrice) {
        return res.status(400).send('Both minPrice and maxPrice are required');
    }

    pool.query(queries.getTopPurchasedGamesQuery, [minPrice, maxPrice], (error, results) => {
        if (error) {
            console.error('Error retrieving top purchased games:', error);
            res.status(500).send('Failed to retrieve top purchased games');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getDevPages = (req, res) => {
    const { devName } = req.query;

    if (!devName) {
        return res.status(400).send('Developer name is required');
    }

    pool.query(queries.getDevPagesQuery, [devName], (error, results) => {
        if (error) {
            console.error('Error retrieving developer pages:', error);
            res.status(500).send('Failed to retrieve developer pages');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getGame = (req, res) => {
    const { minPrice, maxPrice, minRating, genre, ageRestrictionToggle } = req.query;

    // Validate input
    if (!minPrice || !maxPrice || !minRating || !genre || ageRestrictionToggle === undefined) {
        return res.status(400).send('All parameters (minPrice, maxPrice, minRating, genre, ageRestrictionToggle) are required');
    }

    pool.query(queries.getGamesQuery, [minPrice, maxPrice, minRating, genre, ageRestrictionToggle], (error, results) => {
        if (error) {
            console.error('Error retrieving games:', error);
            res.status(500).send('Failed to retrieve games');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

module.exports = {
    getDevPages,
    getTopPurchasedGames,
    getMutualFriends,
    getGame,
};