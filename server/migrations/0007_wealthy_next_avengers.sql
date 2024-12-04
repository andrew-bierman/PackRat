CREATE TABLE `item_pack_templates` (
	`item_id` text,
	`pack_template_id` text,
	`quantity` integer DEFAULT 1 NOT NULL,
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
ALTER TABLE item_packs ADD `quantity` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `item` DROP COLUMN `quantity`;