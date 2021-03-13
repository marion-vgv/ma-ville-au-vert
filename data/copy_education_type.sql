BEGIN;

\copy education_type FROM 'docs/datasets/TABLES-PREPAREES/education_type.csv' WITH (FORMAT csv);

COMMIT;