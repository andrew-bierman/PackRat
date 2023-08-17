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
  