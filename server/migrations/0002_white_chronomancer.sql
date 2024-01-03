CREATE TABLE `trip_geojsons` (
	`trip_id` text,
	`geojson_id` text,
	PRIMARY KEY(`geojson_id`, `trip_id`),
	FOREIGN KEY (`trip_id`) REFERENCES `trip`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`geojson_id`) REFERENCES `geojson`(`id`) ON UPDATE no action ON DELETE set null
);
