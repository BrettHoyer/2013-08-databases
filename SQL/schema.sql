CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int NOT NULL auto_increment,
  message TEXT(1000), 
  username VARCHAR(30),
  roomname VARCHAR(30)
  -- FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

-- CREATE TABLE users (
--   id int NOT NULL auto_increment,
--   username VARCHAR(30),
--   firstname VARCHAR(20), 
--   lastname VARCHAR(20), 
--   email VARCHAR(30), 
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE rooms (
--   id int NOT NULL auto_increment,
--   name VARCHAR(30),
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE rooms_users_join
-- (
--   room_id int,
--   user_id int,
--   CONSTRAINT rooms_users_pk PRIMARY KEY (room_id, user_id),
--   CONSTRAINT FK_room 
--       FOREIGN KEY (room_id) REFERENCES Rooms (room_id),
--   CONSTRAINT FK_user 
--       FOREIGN KEY (user_id) REFERENCES Users (user_id)
-- );

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
