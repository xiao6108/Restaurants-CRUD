const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

// 類別
router.get('/category', (req, res) => {
  Restaurants.find({})
    .sort({ category: 'asc' })
    .exec((err, data) => {
      if (err) return console.error(err)
      return res.render('index', { data })
    })
})

// 地區
router.get('/location', (req, res) => {
  Restaurants.find({})
    .sort({ location: 'asc' })
    .exec((err, data) => {
      if (err) return console.error(err)
      return res.render('index', { data })
    })
})

// 升冪 (ascending)
router.get('/atoz', (req, res) => {
  Restaurants.find({})
    .sort({ name: 'asc' })
    .exec((err, data) => {
      if (err) return console.error(err)
      return res.render('index', { data })
    })
})
// 降冪 (ascending)
router.get('/ztoa', (req, res) => {
  Restaurants.find({})
    .sort({ name: 'desc' })
    .exec((err, data) => {
      if (err) return console.error(err)
      return res.render('index', { data })
    })
})


module.exports = router