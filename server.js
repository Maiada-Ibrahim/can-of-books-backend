
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
// mongoose.connect('mongodb://localhost:27017/can-book', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect(`${process.env.LOCAL}/can-book`, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://maiadadb:0000@cluster0-shard-00-00.ii9w9.mongodb.net:27017,cluster0-shard-00-01.ii9w9.mongodb.net:27017,cluster0-shard-00-02.ii9w9.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-114hrc-shard-0&authSource=admin&retryWrites=true&w=majority/can-book', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(`${process.env.DATADB_LINK}`, { useNewUrlParser: true, useUnifiedTopology: true });



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
    // seedDataCollection()
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
function updatebooktHandler (req,res) {
    let {title,description,email} = req.body;
    let bookid = req.params.bookid;
    console.log(req.body)
    mongodb.findOne({_id:bookid},(error,bookInfo) =>{
        bookInfo.title = title;
        bookInfo.description= description;
        bookInfo.email= email;
        bookInfo.save()
        .then(()=>{
            mongodb.find({ email:email }, function (err, ownerData) {
                if (err) {
                    console.log('error in getting the data')
                } else {
                    console.log('ownerData');
                    res.send(ownerData)
                }
            })
        }).catch(error=>{
            console.log('error in saving ')
        })
    })
}
//----------------------------------------------------------------
// // const mongoose = require('mongoose');
// // let mongodb={};

// //Schema

// const book = new mongoose.Schema({
//     title: String,
//     description:String,
//     email:String
// });
// //Model
// const bookModel = mongoose.model('yourbook', book);
function seedDataCollection() {
    const book1 = new mongodb({
        title:'Black befitting your',
        description:'The novel revolves around a fifty-year-old Lebanese millionaire who fell in love with a twenty-seven-year-old Algerian singer, Hala El-Wafi. Talal, who has struggled to enrich his cultural crop in music, art and poetry, begins to develop plan after plan to entrap this beautiful woman who wears black to mourn the killing of her father and brother during the turmoil that Algeria witnessed at the beginning of this century',
        email:'maiada.ibrahim.27@gmail.com'
    })

    book1.save()
    const book2 = new mongodb({
        title:'Black befitting your',
        description:'Creature broke into my life,My uncle and his wife died in an unfortunate accident two months ago, leaving their only daughter (Raghad), who is almost three years old... to live as an orphan for life,At first, the little girl stayed in her aunts house to take care of her, but, given her aunts family circumstances, everyone agreed that my father would join her with us and take care',
        email:'maiada.ibrahim.27@gmail.com'
    })

    book2.save()
    const book3 = new mongodb({
        title:'The Broken Wings ',
        description:'This is the exquisitely tender story of love that beats desperately against the taboos of Oriental tradition. With great sensitivity, Gibran describes his passion as a youth for Selma Karamy, the girl of Beirut who first unfolded to him the secrets of love. But it is a love that is doomed by a social convention which forces Selma into marriage with another man. Portraying the happiness and infinite sorrow of his relationship with Selma, Gibran at the same time probes the spiritual meaning of human existence with profound compassion.',
        email:'maiada.ibrahim.27@gmail.com'
    })

    book3.save()

}
// seedDataCollection()

//----------------------------------------------------------------------------
server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})