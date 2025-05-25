const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE341 Project 2 API',
        description: 'API documentation for Movies and Genres collections',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);