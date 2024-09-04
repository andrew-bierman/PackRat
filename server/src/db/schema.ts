import {
  type InferInsertModel,
  type InferSelectModel,
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

interface OfflineMap {
  name: string;
  styleURL: string;
  bounds: [number[], number[]];
  minZoom: number;
  maxZoom: number;
  metadata: {
    shape: string;
  };
}

export const user = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  password: text('password').notNull(), // Trim + MinLength(7) + Validation
  email: text('email').notNull().unique(), // Lowercase + Trim + Validation
  googleId: text('google_id'),
  code: text('code'),
  is_certified_guide: integer('is_certified_guide', {
    mode: 'boolean',
  }),
  passwordResetToken: text('password_reset_token'),
  passwordResetTokenExpiration: integer('password_reset_token_expiration', {
    mode: 'timestamp',
  }),
  offlineMaps: text('offline_maps', { mode: 'json' }).$type<
    Record<string, OfflineMap>
  >(),
  role: text('role', { enum: ['admin', 'user'] })
    .default('user')
    .$type<'admin' | 'user'>(),
  username: text('username').notNull().unique(), // Trim + Lowercase + Validation
  profileImage: text('profile_image'),
  preferredWeather: text('preferred_weather').default('celsius'),
  preferredWeight: text('preferred_weight').default('lb'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const userFavoritePacks = sqliteTable(
  'user_favorite_packs',
  {
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
    packId: text('pack_id').references(() => pack.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pkWithCustomName: primaryKey({
        name: 'id',
        columns: [table.userId, table.packId],
      }),
    };
  },
);

export const userFavoritePacksRelations = relations(
  userFavoritePacks,
  ({ one }) => ({
    user: one(user, {
      fields: [userFavoritePacks.userId],
      references: [user.id],
    }),
    pack: one(pack, {
      fields: [userFavoritePacks.packId],
      references: [pack.id],
    }),
  }),
);

export const userRelations = relations(user, ({ many }) => ({
  packs: many(pack),
  userFavoritePacks: many(userFavoritePacks),
  itemOwners: many(itemOwners),
  templates: many(template),
  trips: many(trip),
}));

export const pack = sqliteTable('pack', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  owner_id: text('owner_id').references(() => user.id, {
    onDelete: 'cascade',
  }),
  is_public: integer('is_public', { mode: 'boolean' }).default(false),
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
  // total_weight: real('total_weight'),
  // total_score: integer('total_score').default(0),
  // favorites_count: integer('favorites_count').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  // @@map("packs"): undefined,
});

// For a feature yet to be fully implemented

// export const packOwners = sqliteTable(
//   'pack_owners',
//   {
//     packId: text('pack_id').references(() => pack.id, { onDelete: 'set null' }),
//     ownerId: text('owner_id').references(() => user.id, {
//       onDelete: 'cascade',
//     }),
//   },
//   (table) => {
//     return {
//       pkWithCustomName: primaryKey({
//         name: 'id',
//         columns: [table.packId, table.ownerId],
//       }),
//     };
//   },
// );

// export const packOwnersRelations = relations(packOwners, ({ one }) => ({
//   pack: one(pack, {
//     fields: [packOwners.packId],
//     references: [pack.id],
//   }),
//   owner: one(user, {
//     fields: [packOwners.ownerId],
//     references: [user.id],
//   }),
// }));

export const packRelations = relations(pack, ({ one, many }) => ({
  owner: one(user, {
    fields: [pack.owner_id],
    references: [user.id],
  }),
  userFavoritePacks: many(userFavoritePacks),
  // packOwners: many(packOwners),
  itemPacks: many(itemPacks),
  trips: many(trip),
}));

export const itemCategory = sqliteTable('item_category', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name', { enum: ['Food', 'Water', 'Essentials'] })
    .notNull()
    .$type<'Food' | 'Water' | 'Essentials'>(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
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
  categoryId: text('category_id').references(() => itemCategory.id, {
    onDelete: 'set null',
  }),
  ownerId: text('owner_id').references(() => user.id, {
    onDelete: 'cascade',
  }),
  global: integer('global', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  // @@map("items"): undefined,
});

export const itemOwners = sqliteTable(
  'item_owners',
  {
    itemId: text('item_id').references(() => item.id, { onDelete: 'cascade' }),
    ownerId: text('owner_id').references(() => user.id, {
      onDelete: 'cascade',
    }),
  },
  (table) => {
    return {
      pkWithCustomName: primaryKey({
        name: 'id',
        columns: [table.itemId, table.ownerId],
      }),
    };
  },
);

export const itemOwnersRelations = relations(itemOwners, ({ one }) => ({
  item: one(item, {
    fields: [itemOwners.itemId],
    references: [item.id],
  }),
  owner: one(user, {
    fields: [itemOwners.ownerId],
    references: [user.id],
  }),
}));

export const itemPacks = sqliteTable(
  'item_packs',
  {
    itemId: text('item_id').references(() => item.id, { onDelete: 'cascade' }),
    packId: text('pack_id').references(() => pack.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pkWithCustomName: primaryKey({
        name: 'id',
        columns: [table.itemId, table.packId],
      }),
    };
  },
);

export const itemPacksRelations = relations(itemPacks, ({ one }) => ({
  item: one(item, {
    fields: [itemPacks.itemId],
    references: [item.id],
  }),

  pack: one(pack, {
    fields: [itemPacks.packId],
    references: [pack.id],
  }),
}));

export const itemRelations = relations(item, ({ one, many }) => ({
  category: one(itemCategory, {
    fields: [item.categoryId],
    references: [itemCategory.id],
  }),
  itemOwners: many(itemOwners),
  itemPacks: many(itemPacks),
}));

export const template = sqliteTable('template', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  type: text('type', { enum: ['pack', 'trim', 'item'] })
    .notNull()
    .default('pack')
    .$type<'pack' | 'trim' | 'item'>(),
  templateId: text('template_id').notNull(),
  isGlobalTemplate: integer('is_global_template', {
    mode: 'boolean',
  }).default(false),
  createdBy: text('created_by').references(() => user.id, {
    onDelete: 'set null',
  }),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
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
  start_date: text('start_date').notNull(),
  end_date: text('end_date').notNull(),
  destination: text('destination').notNull(),
  owner_id: text('owner_id').references(() => user.id, {
    onDelete: 'cascade',
  }),
  pack_id: text('packs_id').references(() => pack.id, {
    onDelete: 'set null',
  }),
  is_public: integer('is_public', { mode: 'boolean' }),
  type: text('type').default('trip'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
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
    fields: [trip.pack_id],
    references: [pack.id],
  }),
  // geojsons: many(tripGeojsons),
  tripGeojsons: many(tripGeojsons),
}));

export const conversation = sqliteTable('conversation', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id').notNull(),
  itemTypeId: text('itemTypeId').notNull(),
  history: text('history').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
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
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
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
      pkWithCustomName: primaryKey({
        name: 'id',
        columns: [table.wayId, table.nodeId],
      }),
    };
  },
);

export const wayNodesRelations = relations(wayNodes, ({ one }) => ({
  way: one(way, {
    fields: [wayNodes.wayId],
    references: [way.id],
  }),
  node: one(node, {
    fields: [wayNodes.nodeId],
    references: [node.id],
  }),
}));

export const wayRelations = relations(way, ({ many }) => ({
  wayNodes: many(wayNodes),
}));

export const node = sqliteTable('node', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  osm_id: integer('osm_id'),
  lat: real('lat'),
  lon: real('lon'),
  tags: text('tags', { mode: 'json' }).$type<Record<string, string>>(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  // @@map("nodes"): undefined,
});

export const nodeRelations = relations(node, ({ many }) => ({
  wayNodes: many(wayNodes),
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
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
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
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const geojsonRelations = relations(geojson, ({ many }) => ({
  trips: many(tripGeojsons),
  tripGeojsons: many(tripGeojsons),
}));

export const tripGeojsonsRelations = relations(tripGeojsons, ({ one }) => ({
  trip: one(trip, {
    fields: [tripGeojsons.tripId],
    references: [trip.id],
  }),
  geojson: one(geojson, {
    fields: [tripGeojsons.geojsonId],
    references: [geojson.id],
  }),
}));

export const refreshTokens = sqliteTable('refresh_tokens', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  useId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
  token: text('token').notNull(),
});

export type User = InferSelectModel<typeof user>;
export type InsertUser = InferInsertModel<typeof user>;
export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);

export type Trip = InferSelectModel<typeof trip>;
export type InsertTrip = InferInsertModel<typeof trip>;
export const insertTripSchema = createInsertSchema(trip);
export const selectTripSchema = createSelectSchema(trip);

export type TripGeoJson = InferSelectModel<typeof tripGeojsons>;
export type InsertTripGeoJson = InferInsertModel<typeof tripGeojsons>;
export const insertTripGeoJsonSchema = createInsertSchema(tripGeojsons);
export const selectTripGeoJsonSchema = createSelectSchema(tripGeojsons);

export type Template = InferSelectModel<typeof template>;
export type InsertTemplate = InferInsertModel<typeof template>;
export const insertTemplateSchema = createInsertSchema(template);
export const selectTemplateSchema = createSelectSchema(template);

export type Pack = InferSelectModel<typeof pack>;
export type InsertPack = InferInsertModel<typeof pack>;
export const insertPackSchema = createInsertSchema(pack);
export const selectPackSchema = createSelectSchema(pack);

export type ItemCategory = InferSelectModel<typeof itemCategory>;
export type InsertItemCategory = InferInsertModel<typeof itemCategory>;
export const insertItemCategorySchema = createInsertSchema(itemCategory);
export const selectItemCategorySchema = createSelectSchema(itemCategory);

export type Item = InferSelectModel<typeof item>;
export type InsertItem = InferInsertModel<typeof item>;
export const insertItemSchema = createInsertSchema(item);
export const selectItemSchema = createSelectSchema(item);

export type ItemPack = InferSelectModel<typeof itemPacks>;
export type InsertItemPack = InferInsertModel<typeof itemPacks>;
export const insertItemPackSchema = createInsertSchema(itemPacks);
export const selectItemPackSchema = createSelectSchema(itemPacks);

export type ItemOwner = InferSelectModel<typeof itemOwners>;
export type InsertItemOwner = InferInsertModel<typeof itemOwners>;
export const insertItemOwnerSchema = createInsertSchema(itemOwners);
export const selectItemOwnerSchema = createSelectSchema(itemOwners);

export type GeoJson = InferSelectModel<typeof geojson>;
export type InsertGeoJson = InferInsertModel<typeof geojson>;
export const insertGeoJsonSchema = createInsertSchema(geojson);
export const selectGeoJsonSchema = createSelectSchema(geojson);
