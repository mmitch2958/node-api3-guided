const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');  // import morgan 

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

const logger = morgan('combined')
//middleware 
server.use(express.json());
server.use(logger); 

//endpoints 
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
