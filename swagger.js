const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Employee Annual Leave API",
    description: "Automatically generated Swagger documentation",
  },
  host: "localhost:3000",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
