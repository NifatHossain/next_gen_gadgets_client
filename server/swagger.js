const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const swaggerOptions = {
  info: {
    title: "NextGenGadgets API Documentation",
    version: "1.0.0",
    description: "API documentation for NextGenGadgets E-commerce Platform",
  },
  servers: [
    {
      url: "http://localhost:3002/api/v1",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const outputFile = "./swagger/swagger_docs.json";
const endpointsFiles = ["./routes/**/*.js"];

swaggerAutogen(outputFile, endpointsFiles, swaggerOptions).then(() => {
  require("./server");
});