
const getGamesQuery = `
SELECT name, price, rating, genre, age_restrictions
FROM game_information
WHERE price > $1
  AND price < $2
  AND rating > $3
  AND genre ILIKE $4
  AND (age_restrictions <= 18) = $5;
`;



const getMutualFriendsQuery = `
  SELECT 
    u2.username AS mutual_friend, 
    u2.status, 
    u2.age, 
    game_info.most_played_game
  FROM (
    SELECT friend_id 
    FROM friend
    JOIN user_profile u1 ON friend.user_id = u1.user_id
    WHERE u1.username IN ($1, $2)
    GROUP BY friend_id
    HAVING COUNT(DISTINCT u1.username) > 1
  ) AS t1
  JOIN user_profile u2 ON t1.friend_id = u2.user_id
  LEFT JOIN (
    SELECT 
      ua.user_id, 
      g.name AS most_played_game
    FROM user_activity ua
    JOIN game_information g ON ua.game_id = g.game_id
    WHERE ua.time_played = (
      SELECT MAX(ua2.time_played)
      FROM user_activity ua2
      WHERE ua2.user_id = ua.user_id
    )
    GROUP BY ua.user_id, g.name
  ) AS game_info ON u2.user_id = game_info.user_id
  ORDER BY u2.username;
`;

const getTopPurchasedGamesQuery = `
  select * from
	(select game_information.name, game_information.price, count(game_information.name) as sales from purchase
	join game_information on purchase.game_id = game_information.game_id
	group by game_information.name, game_information.price
    order by sales) as t1
where t1.price > $1 and t1.price < $2
`;

const getDevPagesQuery = `
SELECT devgames.dev_name AS Developer, devgames.name AS Game, players.Player_Count, ratings.Avg_Rating
FROM 
    (SELECT dev.dev_id, dev.dev_name, game.game_id, game.name 
     FROM game_information AS game
     JOIN developer_profile AS dev ON game.dev_id = dev.dev_id
    ) AS devgames
JOIN
    (SELECT game_information.game_id, COUNT(user_activity.game_id) AS player_count 
     FROM game_information
     LEFT JOIN user_activity ON game_information.game_id = user_activity.game_id
     GROUP BY game_information.game_id
    ) AS players ON devgames.game_id = players.game_id
JOIN
    (SELECT review.game_id, ROUND(AVG(review.rev_rating), 2) AS avg_rating 
     FROM review
     GROUP BY review.game_id
    ) AS ratings ON devgames.game_id = ratings.game_id
WHERE devgames.dev_name = $1;
`;



module.exports = {
    getDevPagesQuery,
    getTopPurchasedGamesQuery,
    getMutualFriendsQuery,
    getGamesQuery,
};