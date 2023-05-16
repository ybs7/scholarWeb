-- create table users(
-- id serial primary key,
-- email text not null unique,
-- password text not null

-- )

-- create extension pgcrypto


-- insert into users (email,password) values('mert@gmail.com',crypt('123456',gen_salt('bf')))

-- select * from users

-- select * from users
-- where email = 'mert@gmail.com'
-- and password = crypt('123456',password)

-- alter table users
-- add column fullname text not null default ''

-- select * from users

-- update users
-- set fullname ='Mert'
-- where id= 1

-- delete from users
-- where id = 1
-- returning *




