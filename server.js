
'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const axios = require('axios');
const mongoose = require('mongoose');
const mongodb = require('./module/mongodb');


const PORT = process.env.PORT;
const server = express();
server.use(cors());


server.get('/test', testHandler);
function testHandler(req, res) {
    res.send('all good')
}
server.get('/', homeHandler);
function homeHandler(req, res) {
    res.send('home')
}
//-------------------------------------------------------------------------------------------------------------
mongoose.connect('mongodb://localhost:27017/can-book', { useNewUrlParser: true, useUnifiedTopology: true });

// http://localhost:3001/book?email=maiada.ibrahim.27@gmail.com
server.get('/book', testHandler);
console.log( mongodb)
function testHandler(req, res) {
    let emailfromreq = req.query.email;
    // console.log(emailfromreq)
    // console.log('im here in /book')
    mongodb.find({email:emailfromreq},function(err,ownerData){
        if(err) {
            console.log('error in getting the data')
            
        } else {
            console.log(ownerData);
            res.send(ownerData)
        }
    })
    
}




server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})