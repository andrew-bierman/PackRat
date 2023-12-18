import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// User
export const UserTable = sqliteTable('User', {
	id: text('id').primaryKey(),
	name: text("name"),
	password: text("password"),
	email: text('email').notNull(),
	token: text("token"),
	code: text("code"),
	googleId: text("google_id"),
	is_certified_guide: integer("is_certified_guide"),
	passwordResetToken: text("password_reset_token"),
	passwordResetTokenExpiration: integer('password_reset_token_expiration', { mode: 'timestamp' }),
	role: text('role').default("user"),
	username: text("username"),
	profileImage: text("profile_image"),
	preferredWeather: text("preferred_weather"),
	preferredWeight: text("preferred_weight"),
	favorites: text("favorites"),
	packs: text("packs"),
	items: text("items"),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }),
	favoriteDocuments: text('pack[]_undefined'),
	packDocuments: text('pack[]_undefined'),
	itemDocument: text('item_id)').references(()=> item.id),
	templates: text('template[]_undefined'),
	trips: text('trip[]_undefined'),
	Pack: text('pack[]_undefined'),
  });

export type User = InferSelectModel<typeof UserTable>;
export type InsertUser = InferInsertModel<typeof UserTable>;
export const insertUserSchema = createInsertSchema(UserTable);
export const selectUserSchema = createSelectSchema(UserTable);
export type GeoJSON = InferSelectModel<typeof GeoJSONTable>;
export type InsertGeoJSON = InferInsertModel<typeof GeoJSONTable>;
export const GeoJSONTable = sqliteTable("geojson", {
	id: text('id').primaryKey(),
	type: text("type"),
	properties: text('json_undefined'),
	geometry: text('geojsongeometry_undefined'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const itemcategory = sqliteTable("itemcategory", {
	id: text('id').primaryKey(),
	name: text('itemcategoryname_undefined'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	// Item: text('item[]_undefined'),

	// @@map("itemcategories"): undefined,
})
export type Item = InferSelectModel<typeof ItemTable>;
export type InsertItem = InferInsertModel<typeof ItemTable>;
export const ItemTable = sqliteTable("item", {
	id: text('id').primaryKey(),
	name: text("name"),
	weight: text('float_undefined'),
	quantity: integer("quantity"),
	unit: text("unit"),
	global: integer("global").default(0),
	packs: text("packs"),
	owners: text("owners"),
	category: text("category"),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('created_at', { mode: 'timestamp' }),
	type: text("type"),
	categoryDocument: text('itemcategory_id)').references(()=> itemcategory.id),
	packDocuments: text('pack[]_id)').references(()=> pack.id),
	ownerDocuments: text('user[]_undefined'),
	// @@map("items"): undefined,
})
export type Pack = InferSelectModel<typeof PackTable>;
export type InsertPack = InferInsertModel<typeof PackTable>;
export const PackTable = sqliteTable("pack", {
	id: text('id').primaryKey(),
	name: text("name"),
	owner_id: text("owner_id"),
	owners: text("owners"),
	trips: text("trips"),
	is_public: integer("is_public"),
	grades: text('packsgrades_undefined'),
	scores: text('packsscores_undefined'),
	type: text("type").default("pack"),
	items: text("items"),
	favorited_by: text("favorited_by"),
	createdAt: text("created_at"),
	updatedAt: integer('created_at', { mode: 'timestamp' }),
	itemDocuments: text('item[]_id)').references(()=> item.id),
	favoritedByDocuments: text('user[]_undefined'),
	ownerDocuments: text('user[]_undefined'),
	ownerDocument: text('user_id)').references(()=> user.id),

	//: text('virtuals_undefined'),
	total_weight: text('float_undefined'),
	total_scores: integer("total_scores"),
	favorites_count: integer("favorites_count"),

	// @@map("packs"): undefined,
	})
	export type Template = InferSelectModel<typeof TemplateTable>;
	export type InsertTemplate = InferInsertModel<typeof TemplateTable>;
export const TemplateTable = sqliteTable("template", {
	id: text('id').primaryKey(),
	type: text('templatetype_undefined'),
	templateId: text("template_id"),
	isGlobalTemplate: integer("is_global_template").default(0),
	createdBy: text("created_by"),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('created_at', { mode: 'timestamp' }),
	createdByDocument: text('user_id)').references(()=> user.id),

	// @@map("templates"): undefined,
	})
export type Trip = InferSelectModel<typeof TripTable>;
export type InsertTrip = InferInsertModel<typeof TripTable>;

export const TripTable = sqliteTable("trip", {
	id: text('id').primaryKey(),
	name: text("name"),
	description: text("description"),
	duration: text("duration"),
	weather: text("weather"),
	start_date: integer('created_at', { mode: 'timestamp' }),
	end_date: integer('created_at', { mode: 'timestamp' }),
	destination: text("destination"),
	owner_id: text("owner_id"),
	is_public: integer("is_public"),
	type: text("type").default("trip"),
	packs: text("packs"),
	geojson: text('json_undefined'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('created_at', { mode: 'timestamp' }),
	ownerDocument: text('user_id)').references(()=> user.id),

	// @@map("trips"): undefined,
	})

export const user = sqliteTable("user", {
	id: text('id').primaryKey(),
	name: text("name"),
	password: text("password"),
	email: text("email"),
	token: text("token"),
	code: text("code"),
	googleId: text("google_id"),
	is_certified_guide: integer("is_certified_guide"),
	passwordResetToken: text("password_reset_token"),
	passwordResetTokenExpiration: integer('created_at', { mode: 'timestamp' }),
	role: text('role_undefined').default("user"),
	username: text("username"),
	profileImage: text("profile_image"),
	preferredWeather: text("preferred_weather"),
	preferredWeight: text("preferred_weight"),
	favorites: text("favorites"),
	packs: text("packs"),
	item: text("item"),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('created_at', { mode: 'timestamp' }),
	favoriteDocuments: text('pack[]_undefined'),
	packDocuments: text('pack[]_undefined'),
	itemDocument: text('item_id)').references(()=> item.id),
	templates: text('template[]_undefined'),
	trips: text('trip[]_undefined'),
	Pack: text('pack[]_undefined'),

	// @@map("users"): undefined,
	})

export const conversation = sqliteTable("conversation", {
	id: text('id').primaryKey(),
	userId: text("user_id"),
	history: text("history"),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('created_at', { mode: 'timestamp' })

	// @@map("conversations"): undefined,
	})
	export type Way = InferSelectModel<typeof WayTable>;
	export type InsertWay = InferInsertModel<typeof WayTable>;
export const WayTable = sqliteTable("way", {
	id: text('id').primaryKey(),
	osm_id: integer("osm_id"),
	osm_type: text("osm_type").default("way"),
	tags: text('json_undefined'),
	nodes: text("nodes"),
	geoJSON: text('json_undefined'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updated_at: integer('created_at', { mode: 'timestamp' })

	// @@map("ways"): undefined,
	})

export const node = sqliteTable("node", {
	id: text('id').primaryKey(),
	osm_id: integer("osm_id"),
	lat: text('float_undefined'),
	lon: text('float_undefined'),
	osm_type: text("osm_type").default("node"),
	tags: text('json_undefined'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updated_at: integer('created_at', { mode: 'timestamp' }),

	// @@map("nodes"): undefined,
	})

export const relation = sqliteTable("relation", {
	id: text('id').primaryKey(),
	osm_id: integer("osm_id"),
	osm_type: text("osm_type").default("relation"),
	tags: text('json_undefined'),
	members: text('member[]_undefined'),
	geoJSON: text('json_undefined'),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	updated_at: integer('created_at', { mode: 'timestamp' }),

	// @@map("relations"): undefined,
})
