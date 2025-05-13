import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '7Brothers API',
      version: '1.0.0',
      description: 'Documentação da API Sete Irmãos'
    },
    servers: [{ url: 'http://localhost:5000' }]
  },
  apis: ['./src/routes/*.js']
};

export default swaggerJSDoc(options);
