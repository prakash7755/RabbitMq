'use strict';

const client = require('amqplib');
const url = 'amqp://yuvaraj:yuvaraj@localhost:5672';
const $connection = client.connect(url);


async function getRabbitConnection(){
    try{
       const connection = await $connection;
       console.log(`Connected To Q Server`);
       return connection;
    }
    catch(error){
        console.log(error, 'error')
    }
}


module.exports = { getRabbitConnection }
