CREATE TABLE `trip_images` (
	`id` text PRIMARY KEY NOT NULL,
	`path` text NOT NULL,
	`trip_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`trip_id`) REFERENCES `trip`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE trip ADD `is_completed` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE trip ADD `comment` text;