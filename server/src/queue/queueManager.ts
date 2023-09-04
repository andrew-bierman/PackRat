import Queue from 'bull';
import Piscina from 'piscina';
import { fileURLToPath } from 'url';
import path from 'path';

class QueueManager {
  constructor() {
    (this as any).queues = {};
  }

  /**
   * Creates a new queue with the specified name and worker script path.
   *
   * @param {string} queueName - The name of the queue.
   * @param {string} workerScriptPath - The path to the worker script.
   * @return {Queue} The newly created queue.
   */
  createQueue(queueName, workerScriptPath) {
    // Get the directory name of the current ES module file (queueManager.js)

    // Resolve the worker script path relative to the current file
    const resolvedWorkerScriptPath = path.resolve(__dirname, workerScriptPath);

    const piscina = new Piscina({
      filename: resolvedWorkerScriptPath,
    });

    const newQueue = new Queue(queueName);
    newQueue.process(async (job) => {
      // Run the worker task with the job's task as data
      return await piscina.runTask(job.data.task);
    });
    (this as any).queues[queueName] = { queue: newQueue, piscina };
    return newQueue;
  }

  getQueue(queueName) {
    return (this as any).queues[queueName];
  }
}

export const queueManager = new QueueManager();
