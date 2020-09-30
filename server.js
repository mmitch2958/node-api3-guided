const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');  // import morgan 

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

const logger = morgan('combined')
//middleware
function greeter(req, res, next) {
  console.log('hello')
  next();
} 
//for any other password , or none, respond with http status 401 message
function passCheck(req, res, next) {
  if (req.headers.password === "mellon") {
    next();
  } else {
    res.status(401).json({ errorMessage: "Inccorect password" });
  }
}
server.use(passCheck);
server.use(express.json());
server.use(logger); 
server.use(greeter);


//endpoints 
server.use('/api/hubs', hubsRouter);

server.get("/", (req, res) => {
  const password = req.headers.password;
  const nameInsert = req.name ? ` ${req.name}` : "";
  res.status(200).json({ name: nameInsert, password });

});

module.exports = server;
