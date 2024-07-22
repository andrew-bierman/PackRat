import { MessageBatch } from '@cloudflare/workers-types';
import { Bindings } from '..';

async function handleEtlQueue(batch: MessageBatch<Error>, env: Bindings) {
  for (const message of batch.messages) {
    console.log('Processing log message:', message.body);
    // Add your log processing logic here
  }
}

const handleQueueDefault = async (
  batch: MessageBatch<Error>,
  env: Bindings,
) => {
  console.error(`No handler found for queue: ${batch.queue}`);
  // Optionally, implement a default behavior or error handling
};

// Add more handler functions as needed

// Create a Map for handlers
const queueHandlersMap = new Map<
  string,
  (batch: MessageBatch<Error>, env: Bindings) => Promise<void>
>([
  ['etl-queue', handleEtlQueue],
  // Add more handlers here
]);

export async function queue(
  batch: MessageBatch<Error>,
  env: Bindings,
): Promise<void> {
  try {
    const handler = queueHandlersMap.get(batch.queue) || handleQueueDefault;
    await handler(batch, env);
  } catch (error) {
    console.error(`Error processing queue: ${batch.queue}`, error);
    // Optionally, add more error handling logic here
  }
}
