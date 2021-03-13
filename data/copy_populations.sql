BEGIN;

\copy populations(population_total, id_town) FROM 'docs/datasets/TABLES-PREPAREES/populations.csv' WITH (FORMAT csv);

COMMIT;