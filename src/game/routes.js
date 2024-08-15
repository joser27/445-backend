const express = require('express');
const controller = require('./controller');

const router = express.Router();


router.get('/getMutualFriends', controller.getMutualFriends);
router.get('/getTopPurchasedGames', controller.getTopPurchasedGames);
router.get('/getDevPages', controller.getDevPages);
router.get('/getGame', controller.getGame);


module.exports = router;