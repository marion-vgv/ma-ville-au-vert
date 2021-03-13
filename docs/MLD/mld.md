## TOWNS 

- id INTEGER Primary Key NOT NULL
- name_town VAR CHAR 100 NOT NULL
- *id_uu* INTEGER Foreign Key NOT NULL
- *id_dpt* INTEGER Foreign Key NOT NULL
- *id_region* INTEGER Foreign Key NOT NULL

## URBAN_UNITS
- id INTEGER Primary Key NOT NULL
- name_uu VAR CHAR 100 NOT NULL
- tranche_uu INTEGER
- tranche_detailled INTEGER

## POPULATION 
- id SERIAL Primary Key NOT NULL
- population_total INTEGER NOT NULL
- *id_town* INTEGER Foreign Key NOT NULL

## EDUCATION
- id INTEGER Primary Key NOT NULL
- id_uai VAR CHAR 100 NOT NULL
- *id_type* VAR CHAR 100 NOT NULL
- name_entity VAR CHAR 100 NOT NULL
- secteur VAR CHAR 100 NOT NULL
- code_academy INTEGER NOT NULL
- *id_town* INTEGER Foreign Key NOT NULL

## EDUCATION_TYPE
- id INTEGER Primary Key NOT NULL
- type VAR CHAR 100 NOT NULL

## DEPARTMENT
- id INTEGER Primary Key NOT NULL
- name_dpt VAR CHAR 100 NOT NULL
- *id_region* INTEGER Foreign Key NOT NULL

## REGION
- id INTEGER Primary Key NOT NULL
- name_region VAR CHAR 100 NOT NULL