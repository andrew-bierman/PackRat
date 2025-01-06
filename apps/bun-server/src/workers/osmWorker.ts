// import { findOrCreateMany } from '../utils/osmFunctions/modelHandlers';

// Dummy implementation of findOrCreateMany
async function findOrCreateMany(features) {
  // Simulate processing features
  return features.map((feature) => ({
    ...feature,
    id: Math.random().toString(36).substr(2, 9),
  }));
}

/**
 * Process a job and return the result.
 *
 * @param {Object} job - The job to be processed.
 * @return {Object} - The result of processing the job.
 */
export async function processJob(job) {
  const features = job.data;

  console.log('Starting heavy task');
  const start = Date.now();

  try {
    if (!features) {
      throw new Error('No features provided');
    }

    const results = await findOrCreateMany(features); // TODO (use geojson)

    console.log('results', results);

    console.log('Heavy task completed');
    const end = Date.now();

    console.log(`Execution time: ${end - start} ms`);

    return {
      status: 'done',
      data: {
        message: 'Hello from worker thread',
        results,
      },
    };
  } catch (err) {
    console.log('Error during heavy task');
    return {
      status: 'error',
      errorMessage: err.message,
      errorStack: err.stack,
    };
  } finally {
    // Close MongoDB connection when done
    // await mongoose.connection.close();
  }
}
