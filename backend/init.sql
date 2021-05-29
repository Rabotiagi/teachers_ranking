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

INSERT INTO Teacher (fullname, subject, faculty, photo) values ('#1', 'Алгоритми и структуры данных', 'ФИВТ', '../static/ded.jpg');
INSERT INTO Teacher (fullname, subject, faculty, photo) values ('#2', 'Висшая математика', 'ИПСА', '../static/ded.jpg');
INSERT INTO Teacher (fullname, subject, faculty, photo) values ('#3', 'Дискретная математика', 'ФПМ', '../static/ded.jpg');
INSERT INTO Teacher (fullname, subject, faculty, photo) values ('#4', 'Основы программирования', 'ФИВТ', '../static/ded.jpg');
INSERT INTO Teacher (fullname, subject, faculty, photo) values ('#5', 'История науки и техники', 'ФЭЛ', '../static/ded.jpg');