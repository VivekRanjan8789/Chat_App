const mongoose  = require('mongoose');

const express = require('express'); 
const app = express();


const connect = async() => {
    await mongoose.connect("mongodb://localhost/chatapp");
}

module.exports = connect;
