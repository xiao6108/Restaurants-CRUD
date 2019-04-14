const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  google_map: {
    type: String,
    required: true,
  },
  rating: Number,
  description: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Restaurants', restaurantsSchema)