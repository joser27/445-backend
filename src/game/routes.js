const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/setup', controller.setup);
router.get('/achievements', controller.getAchievements);
router.get('/developer_profile', controller.getDeveloperProfile);
router.get('/games', controller.getGames);
router.get('/purchases', controller.getPurchases);
router.get('/reviews', controller.getReviews);
router.get('/user_activity', controller.getUserActivity);
router.get('/friends', controller.getFriends);
router.get('/wishlist', controller.getWishlist);
router.get('/users', controller.getUsers);

module.exports = router;