// Define an interface for the argument object
interface ResponseHandlerArgs {
  c?: any; // It would be better to replace 'any' with the actual type, if known
  message?: any;
  next?: any;
  [key: string]: any; // This allows for extra, arbitrary properties
}

export async function responseHandler({
  c,
  message = 'Success',
  next,
  ...extraArgs
}: ResponseHandlerArgs) {
  // Get the custom message
  const data = c.res.locals?.data ?? { message: 'Success' };

  // Set the custom header
  c.res.setHeader('X-Response-Message', message);
  c.res.setHeader('Access-Control-Expose-Headers', 'X-Response-Message');

  console.log('message', message);

  c.res.status(200).json(data);

  return data;

  if (next) {
    await next(); // Call the next function to proceed to the next middleware or route handler
  }
}

// Usage:
// app.use(async (c, next) => {
//   await responseHandler({ c, message: 'Custom Message', next });
// });

// or simply:
// responseHandler({ c });
