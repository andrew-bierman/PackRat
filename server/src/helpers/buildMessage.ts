type OperationType =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'authenticate'
  | 'fetch';

interface EntityConfig {
  singular: string;
  plural: string;
}

const OPERATIONS: Record<OperationType, string> = {
  create: 'created',
  read: 'retrieved',
  update: 'updated',
  delete: 'deleted',
  authenticate: 'authenticated',
  fetch: 'fetched',
};

const ENTITIES: Record<string, EntityConfig> = {
  user: {
    singular: 'User',
    plural: 'Users',
  },
  item: {
    singular: 'Item',
    plural: 'Items',
  },
  trip: {
    singular: 'Trip',
    plural: 'Trips',
  },
  // ... add more as needed
};

interface MessageOptions {
  isPlural?: boolean;
  customMessage?: string;
  details?: Record<string, any>;
}

export function buildMessage(
  operation: OperationType,
  entityKey: string,
  success: boolean = true,
  options: MessageOptions = {},
): string {
  if (options.customMessage) return options.customMessage;

  const entityConfig = ENTITIES[entityKey];
  if (!entityConfig) {
    throw new Error(`No entity configuration found for key "${entityKey}"`);
  }

  const baseEntity = options.isPlural
    ? entityConfig.plural
    : entityConfig.singular;
  const baseOperation = OPERATIONS[operation];

  let message = success
    ? `${baseEntity} ${baseOperation} successfully.`
    : `Failed to ${operation} ${baseEntity}.`;

  if (options.details) {
    for (const [key, value] of Object.entries(options.details)) {
      message += ` ${key}: ${value}.`;
    }
  }

  return message;
}

// Example
// console.log(buildMessage('create', 'user', true, { details: { id: '1234' } }));  // "User created successfully. id: 1234."
// console.log(buildMessage('fetch', 'item', true, { isPlural: true })); // "Items fetched successfully."
// console.log(buildMessage('delete', 'trip', false, { details: { reason: 'Trip was duplicated' } })); // "Failed to delete Trip. reason: Trip was duplicated."
// console.log(buildMessage('read', 'user', true, { customMessage: 'User profile retrieved successfully.' })); // "User profile retrieved successfully."
