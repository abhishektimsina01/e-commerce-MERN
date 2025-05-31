// swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TODO List API',
      version: '1.0.0',
      description: 'A simple Express TODO API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // or your deployed URL
      },
    ],
  },
  apis: ['./routes/*.js'], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export {swaggerSpec}
