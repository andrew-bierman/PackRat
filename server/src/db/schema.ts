import {
  InferInsertModel,
  InferSelectModel,
  relations,
  sql,
} from 'drizzle-orm';
import {
  primaryKey,
  integer,
  real,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { createId } from '@paralleldrive/cuid2';

export const user = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  password: text('password').notNull(), // Trim + MinLength(7) + Validation
  email: text('email').notNull().unique(), // Lowercase + Trim + Validation
  token: text('token'), // Trim
  googleId: text('google_id'),
  code: text('code'),
  is_certified_guide: integer('is_certified_guide', {
    mode: 'boolean',
  }),
  passwordResetToken: text('password_reset_token'),
  passwordResetTokenExpiration: integer('password_reset_token_expiration', {
    mode: 'timestamp',
  }),
  role: text('role', { enum: ['admin', 'user'] }).default('user'),
  username: text('username').notNull().unique(), // Trim + Lowercase + Validation
  profileImage: text('profile_image'),
  preferredWeather: text('preferred_weather'),
  preferredWeight: text('preferred_weight'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export const userFavoritePacks = sqliteTable(
  'user_favorite_packs',
  {
    userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
    packId: text('pack_id').references(() => pack.id, { onDelete: 'set null' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.packId] }),
      pkWithCustomName: primaryKey({
        name: 'id',
        columns: [table.userId, table.packId],
      }),
    };
  },
);

export const userRelations = relations(user, ({ many }) => ({
  packs: many(pack),
  favorites: many(userFavoritePacks),
  items: many(itemOwners),
  templates: many(template),
  trips: many(trip),
}));

export const pack = sqliteTable('pack', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  owner_id: text('owner_id').references(() => user.id, {
    onDelete: 'set null',
  }),
  is_public: integer('is_public', { mode: 'boolean' }),
  grades: text('grades', { mode: 'json' })
    .$type<Object>()
    .default(
      JSON.stringify({
        weight: '',
        essentialItems: '',
        redundancyAndVersatility: '',
      }),
    ),
  scores: text('scores', { mode: 'json' })
    .$type<Object>()
    .default(
      JSON.stringify({
        weightScore: 0,
        essentialItemsScore: 0,
        redundancyAndVersatilityScore: 0,
      }),
    ),
  type: text('type').default('pack'),
  total_weight: real('total_weight'),
  total_score: integer('total_score').default(0),
  favorites_count: integer('favorites_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  // @@map("packs"): undefined,
});

export const packRelations = relations(pack, ({ one, many }) => ({
  owner: one(user, {
    fields: [pack.owner_id],
    references: [user.id],
  }),
  favoritedBy: many(userFavoritePacks),
  items: many(itemPacks),
  trips: many(trip),
}));

export const itemCategory = sqliteTable('item_category', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name', { enum: ['Food', 'Water', 'Essentials'] }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),

  // @@map("itemcategories"): undefined,
});

export const itemCategoryRelations = relations(itemCategory, ({ many }) => ({
  items: many(item),
}));

export const item = sqliteTable('item', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  weight: real('weight').notNull(),
  quantity: integer('quantity').notNull(),
  unit: text('unit').notNull(),
  category: text('category').references(() => itemCategory.id, {
    onDelete: 'set null',
  }),
  global: integer('global', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),

  // @@map("items"): undefined,
});

export const itemOwners = sqliteTable(
  'item_owners',
  {
    itemId: text('item_id').references(() => item.id),
    ownerId: text('owner_id').references(() => user.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.itemId, table.ownerId] }),
      pkWithCustomName: primaryKey({
        name: 'id',
        columns: [table.itemId, table.ownerId],
      }),
    };
  },
);

export const itemPacks = sqliteTable(
  'item_packs',
  {
    itemId: text('item_id').references(() => item.id),
    packId: text('pack_id').references(() => pack.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.itemId, table.packId] }),
      pkWithCustomName: primaryKey({
        name: 'id',
        columns: [table.itemId, table.packId],
      }),
    };
  },
);

export const itemRelations = relations(item, ({ one, many }) => ({
  category: one(itemCategory, {
    fields: [item.category],
    references: [itemCategory.id],
  }),
  owners: many(itemOwners),
  packs: many(itemPacks),
}));

export const template = sqliteTable('template', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  type: text('type', { enum: ['pack', 'trim', 'item'] })
    .notNull()
    .default('pack'),
  templateId: text('template_id').notNull(),
  isGlobalTemplate: integer('is_global_template', {
    mode: 'boolean',
  }).default(false),
  createdBy: text('created_by').references(() => user.id, {
    onDelete: 'set null',
  }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  // @@map("templates"): undefined,
});

export const templateRelations = relations(template, ({ one }) => ({
  createdBy: one(user, {
    fields: [template.createdBy],
    references: [user.id],
  }),
}));

export const trip = sqliteTable('trip', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  description: text('description').notNull(),
  duration: text('duration').notNull(),
  weather: text('weather').notNull(),
  start_date: integer('start_date', { mode: 'timestamp' }).notNull(),
  end_date: integer('end_date', { mode: 'timestamp' }).notNull(),
  destination: text('destination').notNull(),
  owner_id: text('owner_id').references(() => user.id, {
    onDelete: 'set null',
  }),
  packs: text('packs').references(() => pack.id, { onDelete: 'set null' }),
  is_public: integer('is_public', { mode: 'boolean' }),
  type: text('type').default('trip'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),

  // @@map("trips"): undefined,
});

export const tripGeojsons = sqliteTable(
  'trip_geojsons',
  {
    tripId: text('trip_id').references(() => trip.id, { onDelete: 'set null' }),
    geojsonId: text('geojson_id').references(() => geojson.id, {
      onDelete: 'set null',
    }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.tripId, table.geojsonId] }),
      pkWithCustomName: primaryKey({
        name: 'id',
        columns: [table.tripId, table.geojsonId],
      }),
    };
  },
);

export const tripRelations = relations(trip, ({ one, many }) => ({
  owner: one(user, {
    fields: [trip.owner_id],
    references: [user.id],
  }),
  packs: one(pack, {
    fields: [trip.packs],
    references: [pack.id],
  }),
  geojsons: many(tripGeojsons),
}));

export const conversation = sqliteTable('conversation', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id').notNull(),
  history: text('history').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),

  // @@map("conversations"): undefined,
});

export const way = sqliteTable('way', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  osm_id: integer('osm_id'),
  osm_type: text('osm_type'),
  tags: text('tags', { mode: 'json' }).$type<Object>(),
  geoJSON: text('geo_json', { mode: 'json' }).$type<Object>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  // @@map("ways"): undefined,
});

export const wayNodes = sqliteTable(
  'way_nodes',
  {
    wayId: text('way_id').references(() => way.id, { onDelete: 'set null' }),
    nodeId: text('node_id').references(() => node.id, { onDelete: 'set null' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.wayId, table.nodeId] }),
      pkWithCustomName: primaryKey({
        name: 'id',
        columns: [table.wayId, table.nodeId],
      }),
    };
  },
);

export const wayRelations = relations(way, ({ many }) => ({
  nodes: many(wayNodes),
}));

export const node = sqliteTable('node', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  osm_id: integer('osm_id'),
  lat: real('lat'),
  lon: real('lon'),
  tags: text('tags', { mode: 'json' }).$type<Record<string, string>>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  // @@map("nodes"): undefined,
});

export const nodeRelations = relations(node, ({ many }) => ({
  ways: many(wayNodes),
}));

export const relation = sqliteTable('relation', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  osm_id: integer('osm_id'),
  osm_type: text('osm_type').default('relation'),
  tags: text('tags', { mode: 'json' }).$type<Object>(),
  members: text('members', { mode: 'json' }).$type<
    Array<{ type: string; refId: number; role: string }>
  >(),
  geoJSON: text('geo_json', { mode: 'json' }).$type<Object>(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),

  // @@map("relations"): undefined,
});

export const geojson = sqliteTable('geojson', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  type: text('type').notNull(), // Regex
  geojsonId: text('geo_json_id').notNull(), // Regex
  properties: text('properties', { mode: 'json' }).$type<Object>(),
  geometry: text('geometry', { mode: 'json' })
    .$type<{
      type:
        | 'Point'
        | 'LineString'
        | 'Polygon'
        | 'MultiPoint'
        | 'MultiPolygon'
        | 'MultiLineString';
      coordinates: Array<number | number[]>;
    }>()
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export const geojsonRelations = relations(geojson, ({ many }) => ({
  trips: many(tripGeojsons),
}));

export type User = InferSelectModel<typeof user>;
export type InsertUser = InferInsertModel<typeof user>;
export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);
