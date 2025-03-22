import { trip } from './db/schema';
import { pack } from './db/schema';
import { item } from './db/schema';
import { user } from './db/schema';

import m2s from 'mongoose-to-swagger';
import swaggerJsdoc from 'swagger-jsdoc';

// import options from "../utils/swaggerOptions.js";

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'PackRat API', // Specify the title of your API
      version: '1.0.0', // Specify the version of your API
      description: 'API documentation for the PackRat MERN application',
    },
  },

  // Path to the API routes
  apis: [
    // "./*.js", // this will look for .js files in the current directory
    // "./**/*.js", // this will look for .js files in all subdirectories

    './src/routes/*.ts',
    // "../middleware/validators/*.js",
    // "../models/*.js",
    // "../controllers/*.js",
  ],

  servers: [
    {
      url: 'http://localhost:8787',
      description: 'Development server',
    },
    {
      url: 'https://packrat.world/',
      description: 'Production server',
    },
  ],
};
//  Swagger-jsdoc with the options
const specs: any = swaggerJsdoc(options);

// Add the schemas generated by mongoose-to-swagger to the components.schemas property of the specs object
specs.components = {
  schemas: {
    User: m2s(user),
    Trip: m2s(trip),
    Pack: m2s(pack),
    Item: m2s(item),
  },
};

// console.log("options ----- ", options);
// console.log("specs ----- ", specs);

export default specs;
