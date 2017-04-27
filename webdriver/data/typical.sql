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

INSERT INTO public.organizations (id, name) VALUES ('09cc87e7-ea6d-4dff-8158-843f095208b6', 'Concur Technologies');
INSERT INTO public.organizations (id, name) VALUES ('df5ff88e-e409-41cc-bacc-7b9fc589c186', 'Microsoft Corporation');
INSERT INTO public.organizations (id, name) VALUES ('e3063cfc-f411-4dc5-9012-f7bbd0684f77', 'University of Washington');

INSERT INTO public.users (id, firstname, lastname, orgid) VALUES ('5bee186d-6675-4a6e-9d71-d889136dbf6c', 'Barack', 'Obama', '09cc87e7-ea6d-4dff-8158-843f095208b6');
INSERT INTO public.users (id, firstname, lastname, orgid) VALUES ('e584de0f-cf3a-4807-a1d8-ad1ada59d4f9', 'Bill', 'Gates', 'df5ff88e-e409-41cc-bacc-7b9fc589c186');
INSERT INTO public.users (id, firstname, lastname, orgid) VALUES ('2b4cbaba-3054-4e74-8848-6fe6da4bc4c2', 'Mako', 'Guest', 'e3063cfc-f411-4dc5-9012-f7bbd0684f77');
INSERT INTO public.users (id, firstname, lastname, orgid) VALUES ('753808bc-8e00-4f87-906c-b884fbd23b01', 'Jeff', 'Handley', '09cc87e7-ea6d-4dff-8158-843f095208b6');
INSERT INTO public.users (id, firstname, lastname, orgid) VALUES ('40893ae2-a8da-4bff-921a-eed9a4ca7549', 'Mark', 'Nelson', '09cc87e7-ea6d-4dff-8158-843f095208b6');