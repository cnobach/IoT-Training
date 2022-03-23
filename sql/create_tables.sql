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