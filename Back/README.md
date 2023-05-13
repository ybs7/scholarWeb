# scholarWeb

## Run requirement
- node.js
    - pg
    - dotenv
    - express
    - react
    - nodemon
    - to install: 
        - `npm i --save--dev nodemon`
        - `npm i express pg dotenv react-scripts@latest`
        - `npx create-react-app my-app`
- postgreSQL
- serpAPI


## database settings
- database port 5432
- database hostname postgres
- user name postgres
- all password 1071
- dumy table: "users"=> {
    "id":"integer notNULL primaryKey",
    "email":"text notNULL",
    "password":"text notNULL",
    "fullname":"text notNULL"
}
- users table create query script : `create table users(id serial primary key,email text not null unique,password text not null,fullname text not null)`

## postman
"test.postman_collection.json"