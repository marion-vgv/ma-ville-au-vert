BEGIN;

DROP TABLE IF EXISTS 
"towns",
"urban_units",
"populations",
"education_places",
"education_type",
"departments",
"regions";

CREATE TABLE IF NOT EXISTS "urban_units" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name_uu" VARCHAR NOT NULL,
    "tranche_uu" INTEGER,
    "tranche_detailled" INTEGER
);

CREATE TABLE IF NOT EXISTS "regions" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name_region" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "education_type" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "type" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "departments" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name_dpt" VARCHAR NOT NULL,
    "id_region" INTEGER NOT NULL REFERENCES "regions" ("id")
);


CREATE TABLE IF NOT EXISTS "towns" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name_town" VARCHAR NOT NULL,
    "id_uu" INTEGER NOT NULL REFERENCES "urban_units" ("id"),
    "id_dpt" INTEGER NOT NULL REFERENCES "departments" ("id"),
    "id_region" INTEGER NOT NULL REFERENCES "regions" ("id")
);

CREATE TABLE IF NOT EXISTS "populations" (
    "id" SERIAL PRIMARY KEY,
    "population_total" INTEGER NOT NULL,
    "id_town" INTEGER NOT NULL REFERENCES "towns" ("id")
);

CREATE TABLE IF NOT EXISTS "education_places" (
    "id" SERIAL PRIMARY KEY,
    "id_uai" VARCHAR NOT NULL,
    "id_type" INTEGER NOT NULL REFERENCES "education_type" ("id"),
    "name_place" VARCHAR NOT NULL,
    "secteur" VARCHAR NOT NULL,
    "code_academy" INTEGER NOT NULL,
    "id_town" INTEGER NOT NULL REFERENCES "towns" ("id")
);

COMMIT;

