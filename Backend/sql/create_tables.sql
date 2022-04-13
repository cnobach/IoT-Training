-- User Table
CREATE TABLE IF NOT EXISTS users (
    ID SERIAL PRIMARY KEY unique,
    name varchar(30) NOT NULL unique,
    password varchar(100) NOT NULL,
    email varchar(50) NOT NULL unique,
    address varchar(50) NOT NULL,
    city varchar(20) NOT NULL,
    state varchar(20) NOT NULL,
    zip INT NOT NULL
);

-- Base Creations
INSERT INTO users (name, password, email, address, city, state, zip)
VALUES
('Admin', 'admin', 'admin@gmail.com', '123 sesame st', 'Tempe', 'Arizona', 85282),
('User', 'user', 'user@gmail.com', '123 sesame st', 'Tempe', 'Arizona', 85282);

-- Item Table
CREATE TABLE IF NOT EXISTS items (
    ID SERIAL PRIMARY KEY unique,
    name VARCHAR(30) NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(255),
    price NUMERIC(6,2) NOT NULL
);
--                      DATE is in the form yyyy-mm-dd
-- Base Creations
INSERT INTO items (name, date, description, price)
VALUES
('Macbook Pro', '2022-03-23', 'A very expensive computer you probably should not buy.', 2499.00),
('ASUS Vivobook Pro', '2022-03-23', 'A computer with all around better specs that is over $1k cheaper.', 1400.00);

-- Cart Table **need to see how i implement cart first, so far barebones**
CREATE TABLE IF NOT EXISTS cart (
    cartId SERIAL PRIMARY KEY unique,
    userId INT REFERENCES users(ID) unique,
    items INT[]
);

INSERT INTO cart (userId, items) VALUES (5, '{1, 2, 4, 5}'), (1, '{6, 7, 8}');

-- inventory table to check for the amount of items in the 'warehouse'
CREATE TABLE IF NOT EXISTS inventory (
    itemId INT REFERENCES items(ID) unique,
    quantity INT NOT NULL
);

-- Transaction table to keep record of all past transactions
CREATE TABLE IF NOT EXISTS transaction (
    items INT[],
    customer INT REFERENCES users(ID),
    date DATE NOT NULL
);

-- Drop Commands in order
DROP TABLE transaction;
DROP TABLE inventory;
DROP TABLE cart;
DROP TABLE items;
DROP TABLE users;

-- Create the tables in opposite orders