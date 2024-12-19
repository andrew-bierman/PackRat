/*
 SQLite does not support "Drop not null from column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/
/* MANUAL MIGRATION */
CREATE TABLE `trip_new` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`parks` text,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`destination` text NOT NULL,
	`owner_id` text REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	`packs_id` text REFERENCES `pack`(`id`) ON UPDATE no action ON DELETE set null,
	`is_public` integer,
	`activity` text DEFAULT 'trip',
	`bounds` text,
	`type` text DEFAULT 'trip',
	`scores` text DEFAULT '{"totalScore":0}',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO trip_new
SELECT * FROM trip;

DROP TABLE trip;

ALTER TABLE trip_new RENAME TO trip;

ALTER TABLE trip ADD `trails` text;
