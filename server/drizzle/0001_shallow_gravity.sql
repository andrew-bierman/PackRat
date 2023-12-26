/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
/*
You're trying to delete PRIMARY KEY(geojson_id,trip_id) from 'trip' table
SQLite does not supportprimary key deletion from existing table
You can do it in 3 steps with drizzle orm:
 - create new mirror table table without pk, rename current table to old_table, generate SQL
 - migrate old data from one table to another
 - delete old_table in schema, generate sql

or create manual migration like below:

ALTER TABLE table_name RENAME TO old_table;
CREATE TABLE table_name (
	column1 datatype [ NULL | NOT NULL ],
	column2 datatype [ NULL | NOT NULL ],
	...
	PRIMARY KEY (pk_col1, pk_col2, ... pk_col_n)
 );
INSERT INTO table_name SELECT * FROM old_table;

Due to that we don't generate migration automatically and it has to be done manually
*/
--> statement-breakpoint
ALTER TABLE trip ADD `id` text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE trip ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE trip ADD `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE trip ADD `duration` text NOT NULL;--> statement-breakpoint
ALTER TABLE trip ADD `weather` text NOT NULL;--> statement-breakpoint
ALTER TABLE trip ADD `start_date` integer NOT NULL;--> statement-breakpoint
ALTER TABLE trip ADD `end_date` integer NOT NULL;--> statement-breakpoint
ALTER TABLE trip ADD `destination` text NOT NULL;--> statement-breakpoint
ALTER TABLE trip ADD `owner_id` text REFERENCES user(id);--> statement-breakpoint
ALTER TABLE trip ADD `packs` text REFERENCES pack(id);--> statement-breakpoint
ALTER TABLE trip ADD `is_public` integer;--> statement-breakpoint
ALTER TABLE trip ADD `type` text DEFAULT 'trip';--> statement-breakpoint
ALTER TABLE trip ADD `created_at` integer DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE trip ADD `updated_at` integer DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `trip` DROP COLUMN `trip_id`;--> statement-breakpoint
ALTER TABLE `trip` DROP COLUMN `geojson_id`;