
'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const axios = require('axios');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = express();
server.use(cors());

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
server.get('/test', testHandler);
function testHandler(req, res) {
    res.send('all good')
}
server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})
server.get('/', testHandler);
function testHandler(req, res) {
    res.send('home')
}
//-------------------------------------------------------------------------------------------------------------
mongoose.connect('mongodb://localhost:27017/can-book', { useNewUrlParser: true, useUnifiedTopology: true });
//Schema
const book = new mongoose.Schema({
    title: String,
    description:String,
    email:String
});

//Model
const bookModel = mongoose.model('yourbook', book);

function seedDataCollection() {
    const maiada = new bookModel({
        title:'Black befitting your',
        description:'The novel revolves around a fifty-year-old Lebanese millionaire who fell in love with a twenty-seven-year-old Algerian singer, Hala El-Wafi. Talal, who has struggled to enrich his cultural crop in music, art and poetry, begins to develop plan after plan to entrap this beautiful woman who wears black to mourn the killing of her father and brother during the turmoil that Algeria witnessed at the beginning of this century',
        email:'maiada.ibrahim.27@gmail.com'
    })

    maiada.save()
}
// seedDataCollection()

//----------------------------------------------------------------------------------
server.get('/book', testHandler);
function testHandler(req, res) {
    let emailfromreq = req.query.email;
    // console.log(emailfromreq)
    // console.log('im here in /book')
    bookModel.find({email:emailfromreq},function(err,ownerData){
        if(err) {
            console.log('error in getting the data')
            
        } else {
            console.log(ownerData);
            res.send(ownerData)
        }
    })
    
}