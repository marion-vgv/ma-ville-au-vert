BEGIN;

\copy regions FROM 'docs/datasets/TABLES-PREPAREES/regions.csv' WITH (FORMAT csv);

COMMIT;