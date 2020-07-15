CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_first_name VARCHAR(50) NOT NULL,
    user_last_name VARCHAR(50) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    style VARCHAR(50),
);

CREATE TABLE contacts (
    contact_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    contact_first_name VARCHAR(50) NOT NULL,
    contact_last_name VARCHAR(50) NOT NULL,
    contact_email VARCHAR(200) NOT NULL,
    contact_phone_number VARCHAR(20) NOT NULL,
);