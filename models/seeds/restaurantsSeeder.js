const mongoose = require('mongoose')
const Restaurant = require('../restaurants')
const RestaurantJSON = require('../../restaurant.json')
const data = RestaurantJSON.results

mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser:true})

const db = mongoose.connection

db.on('error', ()=>{
  console.log('db error')
})

db.once('open', ()=>{
  for (var i=0;i<data.length;i++){
    Restaurant.create({
      id: data[i].id,
      name: data[i].name,
      name_en: data[i].name_en,
      category: data[i].category,
      image: data[i].image,
      location: data[i].location,
      phone: data[i].phone,
      google_map: data[i].google_map,
      rating: data[i].rating,
      description: data[i].description,
    });
  }
  console.log('db connected!')
})