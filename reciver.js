'use strict';
var port = 4000;
var express = require('express');
var app = express();


const { getRabbitConnection } = require('./connection');
const qName = 'sender';
const connection$ = getRabbitConnection();



async function createChannel() {
    const conn = await connection$;
    return conn.createChannel();
}

const ch$ = createChannel();

async function receiveRabbitMsg(){
    const ch = await ch$;
    ch.consume(qName, function (msg) {
        console.log(" [x] Received %s", msg.content);
    });
}

receiveRabbitMsg();

app.listen(port, () => {
    console.log('App Listen Port At 4000')
})