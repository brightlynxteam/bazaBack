# bazaBack

A back part for Hutorok site

# How To Start

1. run 'npm i'
2. run 'npm i knex -g'
3. run 'npm i nodemon -g'
4. create user 'postgresadmin' with password 'PostgresAdmin' in postgresql
5. create database 'hutorok_db' with postgresadmin as owner
6. run 'knex migrate:latest'
7. run 'knex seed:run'
8. run 'npm start'

# What and Where
 
#### src/server/ 
root directory for code files 
#### src/server/db/ 
root directory for code files for work with db 
#### src/server/db/migrations/ 
directory of migration files for creating structure of db 
#### src/server/db/queries/ 
directory for files with queries to db 
#### src/server/db/seeds/ 
directory for files with seeds to fill db 
#### src/server/helpers/ 
directory for helpers: validator, email sender, etc... 
#### src/server/routes/ 
directory for route files 
