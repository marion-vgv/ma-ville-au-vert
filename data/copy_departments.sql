BEGIN;

\copy departments FROM 'docs/datasets/TABLES-PREPAREES/departments.csv' WITH (FORMAT csv);

COMMIT;