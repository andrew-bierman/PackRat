/**
 * Executes a worker function that processes a job with a task.
 *
 * @param {any} job - The job to be processed.
 * @param {any} task - The task associated with the job.
 * @return {Promise<any>} A promise that resolves to the result of processing the job with the task.
 */
const worker = (job, task) => {
    console.log(`Processing job ${job} with task ${task}`);
    // Wrap setTimeout inside a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Job ${job} with task ${task} processed`);
      }, 1000);
    });
  };
  
  export default worker;
  