require('dotenv').config();
const express = require('express');
const connectDb = require('./db/db');
const server = express();
const port = process.env.PORT || 6000;
const indexRoutes = require('./routes/index.routes');
const path = require('path')

server.use(express.json());
server.use('/public', express.static(path.join(__dirname,'public')))
server.use('/api', indexRoutes);

server.listen(port, () => {
    connectDb();
    console.log(`Sever Is Connected At ${port}`);
})            