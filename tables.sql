CREATE TABLE tweets (
    CANDIDATE TEXT,
    TIME TIMESTAMP,
    NUMBER_OF_TWEETS INTEGER,
    PERCENT_POSITIVE REAL,
    TWEETS_PER_HOUR REAL
);
CREATE TABLE locations (
    COORDINATES REAL ARRAY[2],
    POSITIVE BOOLEAN,
    CANDIDATE TEXT,
    STATE CHAR(2),
    TIME TIMESTAMP
);
CREATE TABLE states (
    STATE CHAR(2),
    PERCENT_POSITIVE REAL
)