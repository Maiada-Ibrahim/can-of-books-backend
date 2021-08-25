
'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const axios = require('axios');
const mongoose = require('mongoose');
const mongodb = require('./module/mongodb');
const bookModel = require('./module/mongodb');
// Middleware (to parse the request body)


const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());


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
// console.log( mongodb)
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


//-------------------------------------------------------------------------lab13
server.post('/addbookfromform', addbook);
async function addbook(req, res) {
    // console.log(req.body);
  
    // let owner = req.body.ownerName;
    // let name = req.body.catName;
    // let breed = req.body.catBreed;
    let { title, description, email } = req.body;
    // const newCat = new kittenModel({
    //     ownerName: ownerName,
    //     catName: catName,
    //     catBreed: catBreed
    // })

    // await newCat.save();

    await mongodb.create({title, description,  email})
    // // await kittenModel.create(req.body)
       console.log('aftercreate')

    mongodb.find({ email }, function (err, ownerData) {
        if (err) {
            console.log('error in getting the data')
        } else {
            // console.log(ownerData);
            res.send(ownerData)
        }
    })

 

}
//----------------------------------------------------------------------------
server.delete('/removebook/:bookid',deleteCatHandler);
function deleteCatHandler(req,res) {
    // console.log(req.query.catID)
    console.log('inside the deleteCatHandler')
    console.log(req.params)
    console.log(req.params.bookid);
    let user= req.query.user;
    console.log(user)
    let bookid = req.params.bookid;
    mongodb.remove({_id:bookid},(error,deletebookData)=>{
        if(error) {
            console.log('error in deleteing the data')
        } else {
            console.log('data deleted', deletebookData)

            mongodb.find({email:user }, function (err, ownerData) {
                console.log('find the user')
                if (err) {
                    console.log('error in getting user the data')
                } else {
                    console.log(ownerData);
                    res.send(ownerData)
                }
            })
        }
    })



}
//---------------------------------------------------------------------------
server.put('/updatebook/:bookid',updatebooktHandler);
function updatebooktHandler(req,res) {
    // console.log(req.query.catID)
    console.log('inside the updatebook')
    // console.log(req.params)
    console.log(req.params.bookid);
    let user= req.query.user;
    // console.log(user)
    let bookid = req.params.bookid;
    // mongodb.remove({_id:bookid},(error,deletebookData)=>{
    //     if(error) {
    //         console.log('error in deleteing the data')
    //     } else {
    //         console.log('data deleted', deletebookData)

    //         mongodb.find({email:user }, function (err, ownerData) {
    //             console.log('find the user')
    //             if (err) {
    //                 console.log('error in getting user the data')
    //             } else {
    //                 console.log(ownerData);
    //                 res.send(ownerData)
    //             }
    //         })
    //     }
    // })



}
//----------------------------------------------------------------------------
server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})