const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE341 Project 2 API',
        description: 'API documentation for Movies and Genres collections',
    },
    host: 'https://cse341-project2-f9x0.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);