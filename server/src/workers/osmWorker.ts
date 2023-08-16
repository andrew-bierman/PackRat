import mongoose from 'mongoose';
import Way from '../models/osm/wayModel.js';
import { findOrCreateMany } from '../utils/osmFunctions/modelHandlers.js';

export async function processJob(job) {
  const features = job.data;
  
  console.log('Starting heavy task');
  const start = Date.now();

  try {
    if (!features) {
      throw new Error("No features provided");
    }

    const results = await findOrCreateMany(Way, features); // TODO (use geojson)

    console.log("results", results);

    console.log("Heavy task completed");
    const end = Date.now();

    console.log(`Execution time: ${end - start} ms`);

    return {
      status: "done",
      data: {
        message: "Hello from worker thread",
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
    await mongoose.connection.close();
  }
}
