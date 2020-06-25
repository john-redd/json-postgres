create table json_table (id serial primary key, doc jsonb);

insert into json_table (doc) values (('{ "firstName": "John", "lastName": "Redd" }'));