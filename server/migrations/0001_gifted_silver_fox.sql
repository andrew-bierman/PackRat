CREATE TABLE `conversation` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`history` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `geojson` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text,
	`json_undefined` text,
	`geojsongeometry_undefined` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `item` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`float_undefined` text,
	`quantity` integer,
	`unit` text,
	`global` integer DEFAULT 0,
	`packs` text,
	`owners` text,
	`category` text,
	`created_at` integer,
	`type` text,
	`itemcategory_id)` text,
	`pack[]_id)` text,
	`user[]_undefined` text,
	FOREIGN KEY (`itemcategory_id)`) REFERENCES `itemcategory`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`pack[]_id)`) REFERENCES `pack`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `itemcategory` (
	`id` text PRIMARY KEY NOT NULL,
	`itemcategoryname_undefined` text,
	`created_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `node` (
	`id` text PRIMARY KEY NOT NULL,
	`osm_id` integer,
	`float_undefined` text,
	`osm_type` text DEFAULT 'node',
	`json_undefined` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `pack` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`owner_id` text,
	`owners` text,
	`trips` text,
	`is_public` integer,
	`packsgrades_undefined` text,
	`packsscores_undefined` text,
	`type` text DEFAULT 'pack',
	`items` text,
	`favorited_by` text,
	`created_at` integer,
	`item[]_id)` text,
	`user[]_undefined` text,
	`user_id)` text,
	`float_undefined` text,
	`total_scores` integer,
	`favorites_count` integer,
	FOREIGN KEY (`item[]_id)`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id)`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `relation` (
	`id` text PRIMARY KEY NOT NULL,
	`osm_id` integer,
	`osm_type` text DEFAULT 'relation',
	`json_undefined` text,
	`member[]_undefined` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `template` (
	`id` text PRIMARY KEY NOT NULL,
	`templatetype_undefined` text,
	`template_id` text,
	`is_global_template` integer DEFAULT 0,
	`created_by` text,
	`created_at` integer,
	`user_id)` text,
	FOREIGN KEY (`user_id)`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `trip` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`description` text,
	`duration` text,
	`weather` text,
	`created_at` integer,
	`destination` text,
	`owner_id` text,
	`is_public` integer,
	`type` text DEFAULT 'trip',
	`packs` text,
	`json_undefined` text,
	`user_id)` text,
	FOREIGN KEY (`user_id)`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`password` text,
	`email` text,
	`token` text,
	`code` text,
	`google_id` text,
	`is_certified_guide` integer,
	`password_reset_token` text,
	`created_at` integer,
	`role_undefined` text DEFAULT 'user',
	`username` text,
	`profile_image` text,
	`preferred_weather` text,
	`preferred_weight` text,
	`favorites` text,
	`packs` text,
	`item` text,
	`pack[]_undefined` text,
	`item_id)` text,
	`template[]_undefined` text,
	`trip[]_undefined` text,
	FOREIGN KEY (`item_id)`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `way` (
	`id` text PRIMARY KEY NOT NULL,
	`osm_id` integer,
	`osm_type` text DEFAULT 'way',
	`json_undefined` text,
	`nodes` text,
	`created_at` integer
);
