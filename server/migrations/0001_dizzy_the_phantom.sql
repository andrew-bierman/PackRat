CREATE TABLE `offlineMap` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`bounds` text,
	`minZoom` integer NOT NULL,
	`metadata` text,
	`owner_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
