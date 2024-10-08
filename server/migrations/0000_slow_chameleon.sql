CREATE TABLE `conversation` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`itemTypeId` text NOT NULL,
	`history` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `geojson` (
	`id` text PRIMARY KEY NOT NULL,
	`geoJSON` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `item` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`weight` real NOT NULL,
	`quantity` integer NOT NULL,
	`unit` text NOT NULL,
	`category_id` text,
	`owner_id` text,
	`global` integer DEFAULT false,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`category_id`) REFERENCES `item_category`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `item_category` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `item_owners` (
	`item_id` text,
	`owner_id` text,
	PRIMARY KEY(`item_id`, `owner_id`),
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `item_packs` (
	`item_id` text,
	`pack_id` text,
	PRIMARY KEY(`item_id`, `pack_id`),
	FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`pack_id`) REFERENCES `pack`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `node` (
	`id` text PRIMARY KEY NOT NULL,
	`osm_id` integer,
	`lat` real,
	`lon` real,
	`tags` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `pack` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`owner_id` text,
	`is_public` integer DEFAULT false,
	`grades` text DEFAULT '{"weight":"","essentialItems":"","redundancyAndVersatility":""}',
	`scores` text DEFAULT '{"weightScore":0,"essentialItemsScore":0,"redundancyAndVersatilityScore":0}',
	`type` text DEFAULT 'pack',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `refresh_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`token` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `item_image` (
  `id` text PRIMARY KEY NOT NULL,
  `item_id` text NOT NULL,
  `url` text NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `relation` (
	`id` text PRIMARY KEY NOT NULL,
	`osm_id` integer,
	`osm_type` text DEFAULT 'relation',
	`tags` text,
	`members` text,
	`geo_json` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `template` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text DEFAULT 'pack' NOT NULL,
	`template_id` text NOT NULL,
	`is_global_template` integer DEFAULT false,
	`created_by` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `trip` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`parks` text,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`destination` text NOT NULL,
	`owner_id` text,
	`packs_id` text,
	`is_public` integer,
	`activity` text DEFAULT 'trip',
	`type` text DEFAULT 'trip',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`packs_id`) REFERENCES `pack`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `trip_geojsons` (
	`trip_id` text,
	`geojson_id` text,
	PRIMARY KEY(`geojson_id`, `trip_id`),
	FOREIGN KEY (`trip_id`) REFERENCES `trip`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`geojson_id`) REFERENCES `geojson`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`google_id` text,
	`code` text,
	`is_certified_guide` integer,
	`password_reset_token` text,
	`password_reset_token_expiration` integer,
	`offline_maps` text,
	`role` text DEFAULT 'user',
	`username` text NOT NULL,
	`profile_image` text,
	`preferred_weather` text DEFAULT 'celsius',
	`preferred_weight` text DEFAULT 'lb',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `user_favorite_packs` (
	`user_id` text,
	`pack_id` text,
	PRIMARY KEY(`pack_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`pack_id`) REFERENCES `pack`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `way` (
	`id` text PRIMARY KEY NOT NULL,
	`osm_id` integer,
	`osm_type` text,
	`tags` text,
	`geo_json` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `way_nodes` (
	`way_id` text,
	`node_id` text,
	PRIMARY KEY(`node_id`, `way_id`),
	FOREIGN KEY (`way_id`) REFERENCES `way`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`node_id`) REFERENCES `node`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);