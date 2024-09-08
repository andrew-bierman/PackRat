ALTER TABLE geojson ADD `geoJSON` text;--> statement-breakpoint
ALTER TABLE `geojson` DROP COLUMN `type`;--> statement-breakpoint
ALTER TABLE `geojson` DROP COLUMN `geo_json_id`;--> statement-breakpoint
ALTER TABLE `geojson` DROP COLUMN `properties`;--> statement-breakpoint
ALTER TABLE `geojson` DROP COLUMN `geometry`;