ALTER TABLE item ADD `sku` text;--> statement-breakpoint
ALTER TABLE item ADD `product_url` text;--> statement-breakpoint
ALTER TABLE item ADD `description` text;--> statement-breakpoint
ALTER TABLE item ADD `product_details` text;--> statement-breakpoint
ALTER TABLE item ADD `seller` text;--> statement-breakpoint
ALTER TABLE item_pack_templates ADD `quantity` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE item_packs ADD `quantity` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `item` DROP COLUMN `quantity`;