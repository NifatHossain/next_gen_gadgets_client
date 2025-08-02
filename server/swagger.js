const swaggerAutogen = require("swagger-autogen")();
const app = require("./app");

const swaggerOptions = {
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation CSE327 Next Gen Gadgets",
  },
  host: "localhost:8000/api/v1",
  schemes: ["http"],
  servers: [
    {
      url: "http://localhost:8000/api/v1",
    },
  ],
};

const outputFile = "./swagger/swagger_docs.json";
const endpointsFiles = ["./routes/**/*.js"];

swaggerAutogen(outputFile, endpointsFiles, swaggerOptions).then(() => {
  require("./server");
});
