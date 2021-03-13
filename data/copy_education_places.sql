BEGIN;

\copy education_places(id_uai, id_type, name_place, secteur, code_academy, id_town) FROM 'docs/datasets/TABLES-PREPAREES/education_places.csv' WITH (FORMAT csv);

COMMIT;