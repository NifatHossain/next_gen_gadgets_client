const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic Swagger options/config
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation Chatinit',
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1', // API base URL
      },
    ],
  },
  apis: ['./server/routes/*.js'], // Adjusted to JS files if you're using JS
};

// Initialize Swagger-jsdoc
const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
