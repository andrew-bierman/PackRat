CREATE TABLE `item_pack_templates` (
	`item_id` text,
	`pack_template_id` text,
	PRIMARY KEY(`item_id`, `pack_template_id`),
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`pack_template_id`) REFERENCES `pack_template`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `pack_template` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`type` text DEFAULT 'packTemplate'
);
--> statement-breakpoint
ALTER TABLE pack ADD `is_template` integer DEFAULT false;