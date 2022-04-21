DROP TABLE IF EXISTS cake CASCADE;
CREATE TABLE cake (
	id BIGINT NOT NULL PRIMARY KEY,
    cake_description VARCHAR(255),
    cake_name VARCHAR(255),
    cakeurl VARCHAR(255)
);
