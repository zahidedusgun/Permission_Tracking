CREATE DATABESE jwt_sql;

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(25) NOT NULL,
)
INSERT INTO
    users (username, password, role)
VALUES
    ('zahide', '123456', 'role' );

CREATE TABLE requests (
    request_id,
    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    perm_location TEXT VARCHAR(50) NOT NULL,
    perm_type TEXT VARCHAR(50) NOT NULL,
    description TEXT VARCHAR(50),
    posting_date DATE TIMESTAMP DEFAULT now()
)
INSERT INTO
    requests (
        start_date,
        end_date,
        perm_location,
        perm_type,
        description
    )
VALUES
    (
        '2021-01-01',
        '2021-01-02',
        'Tel Aviv',
        'Vacation',
        'Going to the beach'
    );