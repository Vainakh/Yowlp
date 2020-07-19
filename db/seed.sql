DROP DATABASE IF EXISTS YOWLP;
CREATE DATABASE YOWLP;

DROP SCHEMA IF EXISTS review;
CREATE SCHEMA review;
SET search_path TO review, public;

DROP TABLE IF EXISTS review.restaurant;

CREATE TABLE review.restaurant
(
    ID   SERIAL PRIMARY KEY,
    RESTAURANT_NAME TEXT NOT NULL,
    PHONE_NUMBER VARCHAR(255),
    RATING INT,
    CATEGORY TEXT,
    PICTURES TEXT[]
);