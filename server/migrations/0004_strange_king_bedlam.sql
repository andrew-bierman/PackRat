ALTER TABLE trip ADD `parks` text;--> statement-breakpoint
ALTER TABLE `trip` DROP COLUMN `duration`;--> statement-breakpoint
ALTER TABLE `trip` DROP COLUMN `weather`;