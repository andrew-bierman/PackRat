import { queueManager } from './queueManager';

/**
 * Processes a job by adding it to a specific queue.
 *
 * @param {any} job - The job to be processed.
 * @param {string} queueName - The name of the queue.
 * @param {string} task - The task associated with the job.
 * @throws {Error} If the specified queue does not exist.
 * @return {Promise<void>} A promise that resolves once the job is added to the queue.
 */
export async function processJob(job: any, queueName: string, task: string) {
  // Get the queue for this job type
  const queueData = queueManager.getQueue(queueName);

  if (!queueData) {
    throw new Error(`Queue ${queueName} does not exist`);
  }

  const { queue } = queueData;

  console.log(`Adding job ${job} with task ${task} to queue ${queueName}`);

  // Add the job and task to the queue
  await queue.add({ job, task });
}
