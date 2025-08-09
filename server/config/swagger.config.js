const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

// Basic Swagger options/config
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "NextGenGadgets API Documentation",
      version: "1.0.0",
      description: "Complete API documentation for NextGenGadgets E-commerce Platform",
    },
    servers: [
      {
        url: "http://localhost:3002/api/v1",
      },
    ]   ,
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // Path to your API docs or route files
}

// Initialize Swagger-jsdoc
const swaggerDocs = swaggerJSDoc(swaggerOptions)

module.exports = {
  swaggerUi,
  swaggerDocs,
}
