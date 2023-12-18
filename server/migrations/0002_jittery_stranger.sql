DROP TABLE `user`;--> statement-breakpoint
/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE User ADD `name` text;--> statement-breakpoint
ALTER TABLE User ADD `password` text;--> statement-breakpoint
ALTER TABLE User ADD `token` text;--> statement-breakpoint
ALTER TABLE User ADD `code` text;--> statement-breakpoint
ALTER TABLE User ADD `google_id` text;--> statement-breakpoint
ALTER TABLE User ADD `is_certified_guide` integer;--> statement-breakpoint
ALTER TABLE User ADD `password_reset_token` text;--> statement-breakpoint
ALTER TABLE User ADD `password_reset_token_expiration` integer;--> statement-breakpoint
ALTER TABLE User ADD `role` text DEFAULT 'user';--> statement-breakpoint
ALTER TABLE User ADD `username` text;--> statement-breakpoint
ALTER TABLE User ADD `profile_image` text;--> statement-breakpoint
ALTER TABLE User ADD `preferred_weather` text;--> statement-breakpoint
ALTER TABLE User ADD `preferred_weight` text;--> statement-breakpoint
ALTER TABLE User ADD `favorites` text;--> statement-breakpoint
ALTER TABLE User ADD `packs` text;--> statement-breakpoint
ALTER TABLE User ADD `items` text;--> statement-breakpoint
ALTER TABLE User ADD `created_at` integer DEFAULT (strftime('%s', 'now'));--> statement-breakpoint
ALTER TABLE User ADD `updated_at` integer;--> statement-breakpoint
ALTER TABLE User ADD `pack[]_undefined` text;--> statement-breakpoint
ALTER TABLE User ADD `item_id)` text REFERENCES item(id);--> statement-breakpoint
ALTER TABLE User ADD `template[]_undefined` text;--> statement-breakpoint
ALTER TABLE User ADD `trip[]_undefined` text;--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/