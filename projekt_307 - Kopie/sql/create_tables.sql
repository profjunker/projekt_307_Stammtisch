create table news (
                      id SERIAL PRIMARY KEY,
                      title varchar(32) not null,
                      short_text varchar(256) not null,
                      autor varchar(32),
                      long_text varchar(2048) not null,
                      create_date date default now()
);