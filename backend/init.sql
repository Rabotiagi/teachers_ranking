\connect app

CREATE TABLE Teacher(
    id serial primary key,
    fullname varchar(100),
    subject varchar(100),
    faculty varchar(100),
    photo varchar(100)
);

CREATE TABLE AppUser(
    email varchar(100) primary key,
    password varchar(100)
);

CREATE TABLE Votes(
    teacher_id integer REFERENCES Teacher(id),
    feature integer ,
    points integer,
    countvote integer
);

CREATE TABLE CheckVote(
    user_email varchar(100) REFERENCES AppUser(email),
    voted integer,
    teacher_id integer REFERENCES Teacher(id)
);