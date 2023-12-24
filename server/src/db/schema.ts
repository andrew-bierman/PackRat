import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import {
  foreignKey,
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

export const user_favorite_packs = sqliteTable(
  'user_favorite_packs',
  {
    userId: text('user_id'),
    packId: text('pack_id'),
  },
  (table) => {
    return {
      userReference: foreignKey(() => ({
        columns: [table.userId],
        foreignColumns: [user.id],
        onDelete: 'SET NULL',
      })),
      packReference: foreignKey(() => ({
        columns: [table.packId],
        foreignColumns: [pack.id],
        onDelete: 'SET NULL',
      })),
    };
  },
);

export const item_category = sqliteTable('item_category', {
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

export const item = sqliteTable(
  'item',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text('name').notNull(),
    weight: real('weight').notNull(),
    quantity: integer('quantity').notNull(),
    unit: text('unit').notNull(),
    category: text('category'),
    global: integer('global', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),

    // @@map("items"): undefined,
  },
  (table) => {
    return {
      itemCategoryReference: foreignKey(() => ({
        columns: [table.category],
        foreignColumns: [item_category.id],
        onDelete: 'SET NULL',
      })),
    };
  },
);

export const item_owners = sqliteTable(
  'item_owners',
  {
    ownerId: text('ownerId'),
    itemId: text('itemId'),
  },
  (table) => {
    return {
      ownerReference: foreignKey(() => ({
        columns: [table.ownerId],
        foreignColumns: [user.id],
        onDelete: 'SET NULL',
      })),
      itemReference: foreignKey(() => ({
        columns: [table.itemId],
        foreignColumns: [item.id],
        onDelete: 'SET NULL',
      })),
    };
  },
);

export const item_packs = sqliteTable(
  'item_packs',
  {
    itemId: text('itemId'),
    packId: text('packId'),
  },
  (table) => {
    return {
      itemReference: foreignKey(() => ({
        columns: [table.itemId],
        foreignColumns: [item.id],
        onDelete: 'SET NULL',
      })),
      packReference: foreignKey(() => ({
        columns: [table.packId],
        foreignColumns: [pack.id],
        onDelete: 'SET NULL',
      })),
    };
  },
);

export const pack = sqliteTable(
  'pack',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text('name').notNull(),
    owner_id: text('owner_id'),
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
  },
  (table) => {
    return {
      ownerReference: foreignKey(() => ({
        columns: [table.owner_id],
        foreignColumns: [user.id],
        onDelete: 'SET NULL',
      })),
    };
  },
);

export const pack_owners = sqliteTable(
  'pack_owners',
  {
    ownerId: text('owner_id'),
    packId: text('pack_id'),
  },
  (table) => {
    return {
      ownerReference: foreignKey(() => ({
        columns: [table.ownerId],
        foreignColumns: [user.id],
        onDelete: 'SET NULL',
      })),
      packReference: foreignKey(() => ({
        columns: [table.packId],
        foreignColumns: [pack.id],
        onDelete: 'SET NULL',
      })),
    };
  },
);

export const template = sqliteTable(
  'template',
  {
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
    createdBy: text('created_by'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    // @@map("templates"): undefined,
  },
  (table) => {
    return {
      createdByReference: foreignKey(() => ({
        columns: [table.createdBy],
        foreignColumns: [user.id],
        onDelete: 'SET NULL',
      })),
    };
  },
);

export const trip = sqliteTable(
  'trip',
  {
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
    owner_id: text('owner_id'),
    packs: text('packs'),
    is_public: integer('is_public', { mode: 'boolean' }),
    type: text('type').default('trip'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),

    // @@map("trips"): undefined,
  },
  (table) => {
    return {
      ownerReference: foreignKey(() => ({
        columns: [table.owner_id],
        foreignColumns: [user.id],
        onDelete: 'SET NULL',
      })),
      packsReference: foreignKey(() => ({
        columns: [table.packs],
        foreignColumns: [pack.id],
        onDelete: 'SET NULL',
      })),
    };
  },
);

export const trip_geojson = sqliteTable(
  'trip_geojson',
  {
    tripId: text('trip_id'),
    geojsonId: text('geojson_id'),
  },
  (table) => {
    return {
      tripReference: foreignKey(() => ({
        columns: [table.tripId],
        foreignColumns: [trip.id],
        onDelete: 'SET NULL',
      })),
      geojsonReference: foreignKey(() => ({
        columns: [table.geojsonId],
        foreignColumns: [geojson.id],
        onDelete: 'SET NULL',
      })),
    };
  },
);

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
    wayId: text('way_id'),
    nodeId: text('node_id'),
  },
  (table) => {
    return {
      wayReference: foreignKey(() => ({
        columns: [table.wayId],
        foreignColumns: [way.id],
        onDelete: 'SET NULL',
      })),
      nodeReference: foreignKey(() => ({
        columns: [table.nodeId],
        foreignColumns: [node.id],
        onDelete: 'SET NULL',
      })),
    };
  },
);

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

export type User = InferSelectModel<typeof user>;
export type InsertUser = InferInsertModel<typeof user>;
export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);
