BEGIN;

\copy towns FROM 'docs/datasets/TABLES-PREPAREES/towns.csv' WITH (FORMAT csv);

COMMIT;