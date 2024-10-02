CREATE TABLE `item_image` (
	`id` text PRIMARY KEY NOT NULL,
	`item_id` text NOT NULL,
	`url` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE trip ADD `scores` text DEFAULT '{"totalScore":0}';