'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const addBookHandler = require('./Module/book')
const getBooksHandler = require('./Module/book')
const deleteBookHandler = require('./Module/book')

const server = express();
server.use(cors());
const PORT = process.env.PORT;




server.get('/', homeHandler);
server.get('/books', getBooksHandler)
server.post('/addBook', addBookHandler);
server.delete('/deletebook', deleteBookHandler);


server.get('*', notFoundHandler);

function notFoundHandler(req, res) {
    res.status(404).send('not found 404')
}

function homeHandler(req, res) {
    res.send('all good')
}

server.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
});