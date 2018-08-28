const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const router = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/ApiServ');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT);
console.log('Server listening on :', PORT);
