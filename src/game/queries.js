
const sqlScript = `
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

-- Insert sample data into Developer_Profile
INSERT INTO Developer_Profile (dev_name, dev_info, date_joined) VALUES
('Jane Doe Studios', 'Known for innovative puzzle games', '2022-03-15'),
('Techie Games', 'Pioneers in VR experiences', '2021-08-22'),
('PixelCraze', 'Experts in pixel art RPGs', '2023-01-10'),
('FutureWorks', 'Specialists in futuristic simulations', '2020-11-05'),
('RetroGems', 'Masters of retro-style platformers', '2024-07-20'),
('EpicGames', 'Creators of immersive adventure games', '2019-05-14'),
('IndieDream', 'Innovative indie game developer', '2021-12-01'),
('CodeMasters', 'Known for complex strategy games', '2020-06-17'),
('ArcadiaSoft', 'Popular for arcade-style games', '2022-09-23'),
('UnityHouse', 'Experts in developing cross-platform games', '2018-04-11');

-- Sample data for User_Profile table
INSERT INTO User_Profile (login_credentials, payment_info, game_library, friend_list, status, age) VALUES
('user1@example.com', 'card1', '1,2,3', '2,3', 'online', 25),
('user2@example.com', 'card2', '2,3,4', '1,3', 'offline', 30),
('user3@example.com', 'card3', '1,4', '1,2', 'online', 22),
('alice.smith@example.com', 'card4', '2,3,5', '4,5', 'online', 25),
('bob.johnson@example.com', 'card5', '1,3,6', '3,4', 'offline', 30),
('charlie.brown@example.com', 'card6', '4,5,6', '1,6', 'online', 22),
('david.wilson@example.com', 'card7', '2,4,7', '2,5', 'online', 27),
('eva.davis@example.com', 'card8', '1,5,8', '1,6', 'offline', 29),
('frank.miller@example.com', 'card9', '3,6,7', '3,5', 'online', 31),
('grace.lee@example.com', 'card10', '2,4,8', '2,4', 'offline', 28),
('hannah.clark@example.com', 'card11', '1,3,7', '1,5', 'online', 26),
('ian.scott@example.com', 'card12', '3,5,8', '3,4', 'online', 24),
('julia.adams@example.com', 'card13', '2,6,7', '2,3', 'offline', 32);

-- Sample data for Game_Information table
INSERT INTO Game_Information (name, dev_id, genre, price, release_info, rating, age_restrictions) VALUES
('Epic Quest', 1, 'RPG', 59.99, '2023-06-15', 8.7, 12),
('Space Adventure', 2, 'Sci-Fi', 49.99, '2024-01-20', 9.2, 10),
('Mystery Manor', 3, 'Puzzle', 29.99, '2022-11-05', 7.5, 8),
('Race Masters', 4, 'Racing', 39.99, '2023-09-10', 8.3, 10),
('Survival Island', 5, 'Survival', 69.99, '2023-07-25', 8.9, 16),
('Fantasy Legends', 6, 'RPG', 55.99, '2024-03-15', 9.0, 13),
('Galactic Warfare', 7, 'Shooter', 44.99, '2024-05-30', 8.1, 14),
('Ancient Puzzles', 8, 'Puzzle', 34.99, '2023-12-01', 7.8, 7),
('Dungeon Explorer', 9, 'RPG', 62.99, '2024-02-10', 8.6, 12),
('Sports Arena', 10, 'Sports', 49.99, '2024-06-20', 8.4, 10);

-- Sample data for User_Activity table
INSERT INTO User_Activity (user_id, game_id, time_played, last_played) VALUES
(1, 1, 120, '2024-07-20'),
(1, 2, 300, '2024-07-21'),
(1, 3, 90, '2024-07-22'),
(2, 2, 150, '2024-07-18'),
(2, 3, 200, '2024-07-19'),
(2, 4, 180, '2024-07-20'),
(3, 1, 60, '2024-07-15'),
(3, 4, 240, '2024-07-16'),
(4, 2, 300, '2024-07-17'),
(4, 5, 120, '2024-07-18'),
(5, 1, 180, '2024-07-19'),
(5, 6, 200, '2024-07-20'),
(6, 3, 120, '2024-07-21'),
(6, 7, 300, '2024-07-22'),
(7, 2, 90, '2024-07-15'),
(7, 8, 180, '2024-07-16'),
(8, 4, 240, '2024-07-17'),
(8, 5, 150, '2024-07-18'),
(9, 1, 200, '2024-07-19'),
(9, 6, 300, '2024-07-20'),
(10, 3, 180, '2024-07-21'),
(10, 7, 90, '2024-07-22'),
(11, 2, 240, '2024-07-15'),
(11, 8, 150, '2024-07-16'),
(12, 4, 200, '2024-07-17'),
(12, 5, 300, '2024-07-18'),
(13, 1, 180, '2024-07-19');

-- Sample data for Friend table
INSERT INTO Friend (user_id, friend_id, date_added, status) VALUES
(1, 2, '2024-01-10', 'accepted'),
(1, 3, '2024-02-15', 'accepted'),
(2, 1, '2024-01-10', 'accepted'),
(2, 3, '2024-03-20', 'accepted'),
(3, 1, '2024-02-15', 'accepted'),
(3, 2, '2024-03-20', 'accepted'),
(4, 5, '2024-04-25', 'accepted'),
(5, 4, '2024-04-25', 'accepted'),
(6, 7, '2024-05-30', 'accepted'),
(7, 6, '2024-05-30', 'accepted'),
(8, 9, '2024-06-10', 'accepted'),
(9, 8, '2024-06-10', 'accepted'),
(10, 11, '2024-07-05', 'pending'),
(11, 10, '2024-07-05', 'pending'),
(12, 13, '2024-07-12', 'accepted'),
(13, 12, '2024-07-12', 'accepted');

-- Sample data for Achievement table
INSERT INTO Achievement (game_id, achv_name, achv_desc) VALUES
(1, 'First Steps', 'Complete the tutorial level.'),
(1, 'Puzzle Master', 'Solve all puzzles in the game.'),
(2, 'Speed Runner', 'Finish the game in under 2 hours.'),
(2, 'Collector', 'Collect all hidden items.'),
(3, 'Survivor', 'Survive for 100 days in-game.'),
(3, 'Builder', 'Build 50 structures.'),
(4, 'Explorer', 'Discover all locations on the map.'),
(4, 'Historian', 'Find all historical artifacts.'),
(5, 'Champion', 'Win 100 battles.'),
(5, 'Strategist', 'Complete the game on hard difficulty.'),
(6, 'Treasure Hunter', 'Find all hidden treasures.'),
(6, 'Master Chef', 'Cook all recipes.'),
(7, 'Beast Master', 'Tame all types of animals.'),
(7, 'Herbalist', 'Find and catalog all herbs.'),
(8, 'Guardian', 'Save all NPCs in danger.'),
(8, 'Lone Wolf', 'Complete the game without hiring any allies.'),
(9, 'Architect', 'Design and build a mega structure.'),
(9, 'Innovator', 'Invent all possible gadgets.'),
(10, 'Hero', 'Complete all main quests.'),
(10, 'Side Quest Enthusiast', 'Complete all side quests.');

-- Sample data for Wishlist table
INSERT INTO Wishlist (user_id, game_id, date_added) VALUES
(1, 1, '2024-01-10'),
(1, 2, '2024-01-15'),
(2, 3, '2024-02-10'),
(2, 4, '2024-02-15'),
(3, 5, '2024-03-20'),
(3, 6, '2024-03-25'),
(4, 7, '2024-04-30'),
(4, 8, '2024-05-05'),
(5, 9, '2024-05-10'),
(5, 10, '2024-05-15'),
(6, 1, '2024-06-01'),
(6, 2, '2024-06-05'),
(7, 3, '2024-06-10'),
(7, 4, '2024-06-15'),
(8, 5, '2024-07-01'),
(8, 6, '2024-07-05'),
(9, 7, '2024-07-10'),
(9, 8, '2024-07-15'),
(10, 9, '2024-07-20'),
(10, 10, '2024-07-25');

-- Sample data for Purchase table
INSERT INTO Purchase (user_id, game_id, purchase_date, price) VALUES
(1, 1, '2024-01-10', 29.99),
(1, 2, '2024-01-15', 49.99),
(2, 3, '2024-02-10', 39.99),
(2, 4, '2024-02-15', 59.99),
(3, 5, '2024-03-20', 19.99),
(3, 6, '2024-03-25', 24.99),
(4, 7, '2024-04-30', 34.99),
(4, 8, '2024-05-05', 44.99),
(5, 9, '2024-05-10', 54.99),
(5, 10, '2024-05-15', 64.99),
(6, 1, '2024-06-01', 29.99),
(6, 2, '2024-06-05', 49.99),
(7, 3, '2024-06-10', 39.99),
(7, 4, '2024-06-15', 59.99),
(8, 5, '2024-07-01', 19.99),
(8, 6, '2024-07-05', 24.99),
(9, 7, '2024-07-10', 34.99),
(9, 8, '2024-07-15', 44.99),
(10, 9, '2024-07-20', 54.99),
(10, 10, '2024-07-25', 64.99);

-- Sample data for Review table
INSERT INTO Review (game_id, user_id, rev_rating, rev_text, rev_date) VALUES
(1, 1, 8.5, 'Great game with innovative mechanics!', '2024-01-12'),
(2, 1, 9.0, 'Amazing VR experience!', '2024-01-18'),
(3, 2, 7.5, 'Enjoyable but could use more content.', '2024-02-12'),
(4, 2, 8.0, 'Loved the futuristic simulation.', '2024-02-20'),
(5, 3, 6.5, 'Good game but has some bugs.', '2024-03-22'),
(6, 3, 7.0, 'Nice graphics and gameplay.', '2024-03-28'),
(7, 4, 8.8, 'Fantastic retro-style platformer!', '2024-05-02'),
(8, 4, 9.2, 'Best arcade-style game I have played.', '2024-05-08'),
(9, 5, 7.5, 'Challenging but fun.', '2024-05-12'),
(10, 5, 8.3, 'Great storyline and characters.', '2024-05-18'),
(1, 6, 9.0, 'Second playthrough, still amazing!', '2024-06-03'),
(2, 6, 8.5, 'VR elements are top-notch.', '2024-06-08'),
(3, 7, 7.0, 'Good game, needs more levels.', '2024-06-13'),
(4, 7, 8.5, 'Immersive and engaging.', '2024-06-18'),
(5, 8, 6.0, 'Not my cup of tea, but well made.', '2024-07-02'),
(6, 8, 7.5, 'Enjoyable and fun.', '2024-07-06'),
(7, 9, 8.0, 'Retro style done right.', '2024-07-12'),
(8, 9, 9.0, 'Highly recommend!', '2024-07-16'),
(9, 10, 7.5, 'Decent game with good replay value.', '2024-07-22'),
(10, 10, 8.8, 'One of my favorites!', '2024-07-26');
`;

const getGames = "SELECT * FROM Game_Information";

module.exports = {
    getGames,
    sqlScript,
};