import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { createId } from '@paralleldrive/cuid2';

export const user = sqliteTable('user', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  password: text('password').notNull(), // Trim + MinLength(7) + Validation
  email: text('email').notNull().unique(), // Lowercase + Trim + Validation
  token: text('token'), // Trim
  googleId: text('google_id'),
  code: text('code'),
  is_certified_guide: integer('is_certified_guide', {
    mode: 'boolean',
  }).notNull(),
  passwordResetToken: text('password_reset_token'),
  passwordResetTokenExpiration: integer('password_reset_token_expiration', {
    mode: 'timestamp',
  }),
  role: text('role').default('user'),
  username: text('username').notNull().unique(), // Trim + Lowercase + Validation
  profileImage: text('profile_image'),
  preferredWeather: text('preferred_weather'),
  preferredWeight: text('preferred_weight'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const user_favorite_packs = sqliteTable('user_favorite_packs', {
  userId: text('user_id').references(() => user.id),
  packId: text('pack_id').references(() => pack.id),
});

export type User = InferSelectModel<typeof user>;
export type InsertUser = InferInsertModel<typeof user>;
export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);

export const item_category = sqliteTable('item_category', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').default('Food'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  // @@map("itemcategories"): undefined,
});

export const item = sqliteTable('item', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  weight: real('weight').notNull(),
  quantity: integer('quantity').notNull(),
  unit: text('unit').notNull(),
  category: text('categoryId').references(() => item_category.id),
  global: integer('global', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  // @@map("items"): undefined,
});

export const item_owners = sqliteTable('item_owners', {
  ownerId: text('ownerId').references(() => user.id),
  itemId: text('itemId').references(() => item.id),
});

export const item_packs = sqliteTable('item_packs', {
  itemId: text('itemId').references(() => item.id),
  packId: text('packId').references(() => pack.id),
});

export const pack = sqliteTable('pack', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  owner_id: text('owner_id').references(() => user.id),
  is_public: integer('is_public', { mode: 'boolean' }),
  grades: text('grades').default(
    sql`'{"weight": "", "essentialItems": "", "redundancyAndVersatility": ""}'`,
  ),
  scores: text('scores').default(
    sql`'{"weightScore": 0, "essentialItemsScore": 0, "redundancyAndVersatilityScore": 0}'`,
  ),
  type: text('type').default('pack'),
  total_weight: real('total_weight'),
  total_score: integer('total_score').default(0),
  favorites_count: integer('favorites_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  // @@map("packs"): undefined,
});

export const pack_owners = sqliteTable('pack_owners', {
  ownerId: text('ownerId').references(() => user.id),
  packId: text('packId').references(() => pack.id),
});

export const template = sqliteTable('template', {
  id: text('id').primaryKey(),
  type: text('templatetype_undefined'),
  templateId: text('template_id'),
  isGlobalTemplate: integer('is_global_template').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer('created_at', { mode: 'timestamp' }),
  createdBy: text('user_id)').references(() => user.id),
  // @@map("templates"): undefined,
});

export const trip = sqliteTable('trip', {
  id: text('id').primaryKey(),
  name: text('name'),
  description: text('description'),
  duration: text('duration'),
  weather: text('weather'),
  start_date: integer('created_at', { mode: 'timestamp' }),
  end_date: integer('created_at', { mode: 'timestamp' }),
  destination: text('destination'),
  owner_id: text('owner_id'),
  is_public: integer('is_public'),
  type: text('type').default('trip'),
  packs: text('packs'),
  geojson: text('json_undefined'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer('created_at', { mode: 'timestamp' }),
  owner: text('user_id)').references(() => user.id),

  // @@map("trips"): undefined,
});

export const conversation = sqliteTable('conversation', {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  history: text('history'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer('created_at', { mode: 'timestamp' }),

  // @@map("conversations"): undefined,
});

export const way = sqliteTable('way', {
  id: text('id').primaryKey(),
  osm_id: integer('osm_id'),
  osm_type: text('osm_type').default('way'),
  tags: text('json_undefined'),
  nodes: text('nodes'),
  geoJSON: text('json_undefined'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updated_at: integer('created_at', { mode: 'timestamp' }),

  // @@map("ways"): undefined,
});

export const node = sqliteTable('node', {
  id: text('id').primaryKey(),
  osm_id: integer('osm_id'),
  lat: text('float_undefined'),
  lon: text('float_undefined'),
  osm_type: text('osm_type').default('node'),
  tags: text('json_undefined'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updated_at: integer('created_at', { mode: 'timestamp' }),

  // @@map("nodes"): undefined,
});

export const relation = sqliteTable('relation', {
  id: text('id').primaryKey(),
  osm_id: integer('osm_id'),
  osm_type: text('osm_type').default('relation'),
  tags: text('json_undefined'),
  members: text('member[]_undefined'),
  geoJSON: text('json_undefined'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updated_at: integer('created_at', { mode: 'timestamp' }),

  // @@map("relations"): undefined,
});

export const geojson = sqliteTable('geojson', {
  id: text('id').primaryKey().$defaultFn(createId),
  type: text('type').notNull(), // Match
  properties: text('json_undefined'),
  geometry: text('geojsongeometry_undefined'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
