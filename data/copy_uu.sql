BEGIN;

\copy urban_units FROM 'docs/datasets/TABLES-PREPAREES/urban_units.csv' WITH (FORMAT csv);

COMMIT;