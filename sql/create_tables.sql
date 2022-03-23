-- User Table
CREATE TABLE IF NOT EXISTS users (
    ID SERIAL PRIMARY KEY,
    name varchar(30) NOT NULL,
    password varchar(30) NOT NULL,
    email varchar(50) NOT NULL,
    address varchar(50) NOT NULL,
    city varchar(20) NOT NULL,
    state varchar(20) NOT NULL,
    zip INT NOT NULL
);

-- Base Creations
INSERT INTO users (name, password, email, address, city, state, zip)
VALUES
('Connor', 'pass', 'connor@aol.com', '123 sesame st', 'Tempe', 'Arizona', 85282),
('Stella', 'dog', 'stella@aol.com', '123 sesame st', 'Tempe', 'Arizona', 85282);

-- Item Table
CREATE TABLE IF NOT EXISTS items (
    ID SERIAL PRIMARY KEY,
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
    ItemID INT,
    FOREIGN KEY(ItemID) REFERENCES items(ID)
);

