# Data dictionary — A Country Known by Its Animals

Every file below sits in `data/` (or `assets/` for the basemap) and is referenced by one or more of the 12 Vega-Lite chart JSONs in `vis/`.

## species_meta.csv
One row per species, pre-sorted by total_records descending. Master lookup.
**Used by:** chart 1
**Columns:** `species`, `common_name`, `scientific_name`, `group`, `color`, `total_records`

## species_totals.csv
Simpler totals (legacy file, kept for compatibility).
**Columns:** `species`, `total_records`

## by_state.csv
Long format: one row per (species × state).
**Used by:** chart 7
**Columns:** `species`, `common_name`, `state_code`, `count`

## by_year.csv
Long format: one row per (species × year). Annual observations per species 1990–2025.
**Used by:** charts 2, 11
**Columns:** `species`, `common_name`, `year`, `count`

## points_sampled.csv
Reservoir-sampled point records, 800 per species = 4,000 rows total.
**Used by:** chart 5
**Columns:** `species`, `common_name`, `lat`, `lon`, `year`, `state_code`

## grid_dominant.csv
0.5° grid cell centroids (~50 km apart). Each row is a cell with its dominant species (the species with the most observations there) and per-species counts. **Replaces the earlier grid_dominant.geojson** (399 KB → 58 KB).
**Used by:** chart 6
**Columns:** `lon`, `lat`, `dominant`, `total`, `n_red_kangaroo`, `n_eastern_grey_kangaroo`, `n_koala`, `n_emu`, `n_platypus`

## species_attributes.csv
Biological traits compiled from Australian Museum, IUCN, and Australian Geographic.
**Used by:** chart 4
**Columns:** `species`, `common_name`, `weight_kg_avg`, `lifespan_wild_yrs`, `gestation_or_incubation_days`, `offspring_per_year`, `activity_pattern`, `diet`

## conservation_status.csv
IUCN Red List + EPBC Act status, plus a `key_threats` summary.
**Used by:** chart 8
**Columns:** `species`, `common_name`, `iucn_status`, `epbc_status`, `key_threats`

## fire_impact_state.csv
Black Summer 2019–20 impact by state.
**Used by:** chart 9
**Columns:** `state`, `area_burnt_kha`, `koalas_lost_est`, `pct_koala_range_burnt`, `note`

## fire_impact_long.csv
Long-format companion to `fire_impact_state.csv`.
**Columns:** `state`, `metric`, `value`

## threats_long.csv
**Fully populated 5 species × 10 threats matrix** = 50 rows. Severity graded Low / Medium / High (score 1/2/3) or Not listed (score 0). Sourced from IUCN species accounts and DCCEEW EPBC Conservation Advice documents.
**Used by:** chart 10
**Columns:** `species`, `common_name`, `threat`, `severity`, `severity_score`, `source`

## global_uniqueness.csv
Number of species worldwide vs in Australia for Monotremata, Marsupialia, Casuariiformes (and Placentalia, filtered out in the chart).
**Used by:** chart 3
**Columns:** `group`, `group_label`, `world_species`, `australia_species`, `australia_endemic`, `share_in_australia`, `note`, `source`

## ../assets/states.geojson
ASGS 2021 State boundaries, simplified to ~2 km tolerance (~190 KB).
**Used by:** charts 5, 12
**Properties:** `STATE_NAME`, `STATE_CODE`
