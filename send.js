'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


const { getRabbitConnection } = require('./connection');
const qName = 'sender';
const connection$ = getRabbitConnection();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

async function createChannel() {
    const conn = await connection$;
    return conn.createChannel();
}

const ch$ = createChannel();


app.post('/', async (req, res)=> {
    const { name } = req.body;
    const ch = await ch$;
    ch.assertQueue(qName);
    ch.sendToQueue(qName, new Buffer(name));
    res.send('Hi')
})


app.listen(port, ()=>{
    console.log('App Listen Port At 3000')
})