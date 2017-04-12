create extension if not exists "pgcrypto";

drop table if exists "users";
drop table if exists "organizations";

create table users
(
	id uuid default gen_random_uuid() not null
		constraint test_table_id_pk
			primary key,
	firstname varchar(50),
	lastname varchar(50),
	orgid uuid
)
;

create table organizations
(
	id uuid default gen_random_uuid() not null
		constraint organizations_pkey
			primary key,
	name varchar(255)
)
;

alter table users
	add constraint users_organizations_id_fk
		foreign key (orgid) references organizations
;