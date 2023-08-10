CREATE DATABESE jwt_sql;

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
)
INSERT INTO
    users (username, email, password)
VALUES
('admin', 'zahi@gmail.com', '123456');