'use strict'
const mongoose = require('mongoose');
// let mongodb={};

//Schema

const book = new mongoose.Schema({
    title: String,
    description:String,
    email:String
});
//Model
const bookModel = mongoose.model('yourbook', book);



function seedDataCollection() {
    const book1 = new bookModel({
        title:'Black befitting your',
        description:'The novel revolves around a fifty-year-old Lebanese millionaire who fell in love with a twenty-seven-year-old Algerian singer, Hala El-Wafi. Talal, who has struggled to enrich his cultural crop in music, art and poetry, begins to develop plan after plan to entrap this beautiful woman who wears black to mourn the killing of her father and brother during the turmoil that Algeria witnessed at the beginning of this century',
        email:'maiada.ibrahim.27@gmail.com'
    })

    book1.save()
    const book2 = new bookModel({
        title:'Black befitting your',
        description:'Creature broke into my life,My uncle and his wife died in an unfortunate accident two months ago, leaving their only daughter (Raghad), who is almost three years old... to live as an orphan for life,At first, the little girl stayed in her aunts house to take care of her, but, given her aunts family circumstances, everyone agreed that my father would join her with us and take care',
        email:'maiada.ibrahim.27@gmail.com'
    })

    book2.save()
    const book3 = new bookModel({
        title:'The Broken Wings ',
        description:'This is the exquisitely tender story of love that beats desperately against the taboos of Oriental tradition. With great sensitivity, Gibran describes his passion as a youth for Selma Karamy, the girl of Beirut who first unfolded to him the secrets of love. But it is a love that is doomed by a social convention which forces Selma into marriage with another man. Portraying the happiness and infinite sorrow of his relationship with Selma, Gibran at the same time probes the spiritual meaning of human existence with profound compassion.',
        email:'maiada.ibrahim.27@gmail.com'
    })

    book3.save()

}
// seedDataCollection()


module.exports=bookModel