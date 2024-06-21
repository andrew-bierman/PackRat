// Sample of how we can use worker threads to do some heavy lifting in the background. Using Piscina library.

/**
 * Executes a heavy task asynchronously and returns the result.
 *
 * @param {any} data - The input data for the heavy task.
 * @return {Promise<any>} - A promise that resolves to the result of the heavy task.
 */
function sample(data) {
  console.log('Starting heavy task');
  const start = Date.now();

  try {
    // Simulate heavy task:
    const sortedData: any = heavyTask(data);

    console.log('Heavy task completed');
    const end = Date.now();

    console.log(`Execution time: ${end - start} ms`);

    return {
      status: 'done',
      data: {
        message: 'Hello from worker thread',
        sortedData,
      },
    };
  } catch (err) {
    console.log('Error during heavy task');
    return {
      status: 'error',
      errorMessage: err.message,
      errorStack: err.stack,
    };
  }
}

// This function simulates a CPU intensive task:
function heavyTask(data) {
  // For instance, sorting a large array could be a CPU intensive task:
  return data.sort();
}

//   Then in the main thread, we can call the sample function like this. Note that we are using the await keyword to wait for the result of the heavy task:
// Create a new thread pool, using our custom import function
// import createPiscina from "./createPiscina";

// const piscina = createPiscina('./worker.js');
